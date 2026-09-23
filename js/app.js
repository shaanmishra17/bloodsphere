/**
 * HEMO LINK - Master Application Controller
 * Department of IT Engineering - Theem College of Engineering, Boisar
 * Project Team: Tanmay Parandwal, Shaan Mishra, Shubham Pradhan, Sumit Pathak
 */

const HemoApp = {
  map: null,
  markers: [],

  init() {
    this.bindEvents();
    this.renderRoleNavigation();
    this.renderEmergencyTicker();
    this.switchRole(HemoStore.getRole());
    this.initMap();
  },

  bindEvents() {
    // Role Switcher Buttons
    document.querySelectorAll('[data-role]').forEach(el => {
      el.addEventListener('click', (e) => {
        const role = e.currentTarget.getAttribute('data-role');
        this.switchRole(role);
      });
    });

    // Donor Registration Form Submit
    const donorForm = document.getElementById('donorRegisterForm');
    if (donorForm) {
      donorForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleDonorRegistration();
      });
    }

    // Hospital Request Form Submit
    const reqForm = document.getElementById('hospitalRequestForm');
    if (reqForm) {
      reqForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleHospitalRequest();
      });
    }

    // Compatibility Selector
    const compSelect = document.getElementById('compatRecipientSelect');
    if (compSelect) {
      compSelect.addEventListener('change', (e) => {
        this.updateCompatibilityMatrix(e.target.value);
      });
    }
  },

  switchRole(role) {
    HemoStore.setRole(role);

    // Update active state on nav pills
    document.querySelectorAll('.role-pill').forEach(pill => {
      if (pill.getAttribute('data-role') === role) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });

    // Hide all role sections
    document.querySelectorAll('.role-view').forEach(view => {
      view.classList.add('d-none');
    });

    // Show selected role section
    const activeView = document.getElementById(`view-${role}`);
    if (activeView) {
      activeView.classList.remove('d-none');
    }

    // Role-specific renders
    if (role === 'public') {
      this.renderPublicView();
    } else if (role === 'hospital') {
      this.renderHospitalView();
    } else if (role === 'admin') {
      this.renderAdminView();
    } else if (role === 'donor') {
      this.renderDonorView();
    }

    // Invalidate map size so it renders properly after tab switch
    if (this.map) {
      setTimeout(() => this.map.invalidateSize(), 200);
    }
  },

  renderRoleNavigation() {
    const role = HemoStore.getRole();
    document.querySelectorAll('.role-pill').forEach(pill => {
      if (pill.getAttribute('data-role') === role) {
        pill.classList.add('active');
      }
    });
  },

  renderEmergencyTicker() {
    const tickerContainer = document.getElementById('emergencyTickerText');
    if (!tickerContainer) return;

    const activeRequests = HemoStore.getActiveRequests();
    if (activeRequests.length === 0) {
      tickerContainer.innerHTML = '<span>All emergency requests currently stabilized. <strong>Standby for alerts.</strong></span>';
      return;
    }

    const items = activeRequests.map(r => 
      `<span class="me-4"><i class="fa-solid fa-triangle-exclamation text-warning me-1"></i> <strong>URGENT:</strong> Need <strong>${r.unitsNeeded} units of ${r.bloodGroup}</strong> at ${r.hospitalName} (${r.hospitalCity}) • Patient: ${r.patientName}</span>`
    ).join(' | ');

    tickerContainer.innerHTML = items;
  },

  // ==========================================
  // PUBLIC / SEEKER VIEW
  // ==========================================
  renderPublicView() {
    HemoGamification.renderCollegeChallenge('publicChallengeContainer');
    HemoGamification.renderLeaderboard('publicLeaderboardContainer');
    this.updateCompatibilityMatrix('O+');
    this.updateStatsCounters();
  },

  updateStatsCounters() {
    const donors = HemoStore.getDonors();
    const verified = donors.filter(d => d.status === 'Verified');
    const requests = HemoStore.getRequests();
    const fulfilled = requests.filter(r => r.status === 'Fulfilled');

    const totalLives = verified.reduce((acc, d) => acc + (d.livesSaved || 0), 0);

    const livesEl = document.getElementById('statLivesSaved');
    const verifiedEl = document.getElementById('statVerifiedDonors');
    const fulfilledEl = document.getElementById('statFulfilledRequests');

    if (livesEl) livesEl.textContent = totalLives.toLocaleString();
    if (verifiedEl) verifiedEl.textContent = verified.length.toString();
    if (fulfilledEl) fulfilledEl.textContent = fulfilled.length.toString();
  },

  updateCompatibilityMatrix(recipientGroup) {
    const matrix = {
      'O-': ['O-'],
      'O+': ['O-', 'O+'],
      'A-': ['O-', 'A-'],
      'A+': ['O-', 'O+', 'A-', 'A+'],
      'B-': ['O-', 'B-'],
      'B+': ['O-', 'O+', 'B-', 'B+'],
      'AB-': ['O-', 'A-', 'B-', 'AB-'],
      'AB+': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+']
    };

    const compatibleDonors = matrix[recipientGroup] || ['O-'];
    const container = document.getElementById('compatResultBadges');
    if (!container) return;

    container.innerHTML = compatibleDonors.map(bg => {
      const isUniversal = bg === 'O-';
      return `
        <div class="col text-center">
          <div class="p-3 border rounded-3 bg-white shadow-sm">
            <span class="bg-badge ${isUniversal ? 'bg-badge-rare' : 'bg-badge-red'} fs-5 mb-1">${bg}</span>
            <div class="small fw-semibold text-dark">${isUniversal ? 'Universal' : 'Compatible'}</div>
          </div>
        </div>
      `;
    }).join('');
  },

  // ==========================================
  // HOSPITAL VIEW
  // ==========================================
  renderHospitalView() {
    this.renderHospitalDonorSearch();
    this.renderHospitalRequestsTable();
  },

  renderHospitalDonorSearch(bloodFilter = 'ALL', maxDist = 'ALL') {
    const container = document.getElementById('hospitalDonorSearchResults');
    if (!container) return;

    // slide 7 requirement: only VERIFIED donors are visible to hospitals!
    let donors = HemoStore.getVerifiedDonors();

    if (bloodFilter !== 'ALL') {
      donors = donors.filter(d => d.bloodGroup === bloodFilter);
    }

    if (donors.length === 0) {
      container.innerHTML = `
        <div class="alert alert-warning mb-0">
          <i class="fa-solid fa-circle-info me-2"></i> No verified donors matching "${bloodFilter}" currently registered.
        </div>
      `;
      return;
    }

    container.innerHTML = donors.map(donor => `
      <div class="card border-0 shadow-sm rounded-3 mb-2 p-3">
        <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div class="d-flex align-items-center">
            <div class="me-3">
              <span class="bg-badge bg-badge-red fs-5">${donor.bloodGroup}</span>
            </div>
            <div>
              <h6 class="mb-0 fw-bold">${donor.name}</h6>
              <div class="small text-muted">
                <i class="fa-solid fa-location-dot me-1 text-danger"></i>${donor.area}, ${donor.city} • ${donor.college}
              </div>
              <div class="small mt-1">
                <span class="badge bg-success-subtle text-success border border-success me-1">
                  <i class="fa-solid fa-shield-check"></i> Admin Verified
                </span>
                <span class="badge bg-warning-subtle text-warning-emphasis border border-warning">
                  Trust Score: ${donor.trustScore}%
                </span>
              </div>
            </div>
          </div>
          <div class="text-end">
            <div class="small text-muted mb-1">Status: <strong class="${donor.availability === 'Available' ? 'text-success' : 'text-danger'}">${donor.availability}</strong></div>
            <a href="tel:${donor.phone}" class="btn btn-sm btn-danger me-1">
              <i class="fa-solid fa-phone me-1"></i> Call ${donor.phone}
            </a>
            <button class="btn btn-sm btn-outline-success" onclick="HemoApp.pingDonor('${donor.id}', '${donor.name}')">
              <i class="fa-brands fa-whatsapp me-1"></i> Ping SOS
            </button>
          </div>
        </div>
      </div>
    `).join('');
  },

  filterHospitalDonors() {
    const blood = document.getElementById('searchFilterBlood').value;
    this.renderHospitalDonorSearch(blood);
  },

  pingDonor(donorId, donorName) {
    alert(`🚨 Emergency SOS ping dispatched to ${donorName}! WhatsApp SMS bridge initialized.`);
  },

  renderHospitalRequestsTable() {
    const container = document.getElementById('hospitalRequestsTableBody');
    if (!container) return;

    const requests = HemoStore.getRequests();
    container.innerHTML = requests.map(req => {
      const isFulfilled = req.status === 'Fulfilled';
      const statusBadge = isFulfilled 
        ? '<span class="badge bg-success">Fulfilled</span>' 
        : '<span class="badge bg-danger pulse-dot-wrapper"><span class="pulse-dot me-1"></span> Active Broadcast</span>';

      return `
        <tr>
          <td><span class="fw-bold text-dark">${req.id}</span></td>
          <td>
            <div class="fw-semibold">${req.patientName}</div>
            <div class="small text-muted">${req.hospitalName} (${req.hospitalCity})</div>
          </td>
          <td><span class="bg-badge bg-badge-red">${req.bloodGroup}</span></td>
          <td><span class="badge ${req.urgency === 'Rare Blood Group' ? 'bg-warning text-dark' : 'bg-danger'}">${req.urgency}</span></td>
          <td>${req.unitsFulfilled} / ${req.unitsNeeded} Units</td>
          <td>${statusBadge}</td>
          <td class="text-end">
            ${!isFulfilled ? `
              <button class="btn btn-sm btn-success" onclick="HemoApp.openFulfillModal('${req.id}')">
                <i class="fa-solid fa-circle-check me-1"></i> Mark Successful Donation
              </button>
            ` : '<span class="text-success small fw-semibold"><i class="fa-solid fa-check-double me-1"></i> Completed & Points Awarded</span>'}
          </td>
        </tr>
      `;
    }).join('');
  },

  openFulfillModal(reqId) {
    const verifiedDonors = HemoStore.getVerifiedDonors();
    let selectOptions = verifiedDonors.map(d => `<option value="${d.id}">${d.name} (${d.bloodGroup}) - ${d.college}</option>`).join('');

    const modalHtml = `
      <div class="modal fade" id="fulfillDonationModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header bg-success text-white">
              <h5 class="modal-title"><i class="fa-solid fa-hand-holding-droplet me-2"></i> Confirm Successful Donation</h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <p class="small text-muted">
                Confirming this donation updates hospital records and automatically deposits 
                <strong>SpherePoints</strong> (+100 Normal / +150 Emergency / +200 Rare) into the donor's digital wallet!
              </p>
              <div class="mb-3">
                <label class="form-label fw-bold small">Select Participating Verified Donor</label>
                <select class="form-select" id="fulfillDonorSelect">
                  ${selectOptions}
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-success" onclick="HemoApp.confirmDonationFulfillment('${reqId}')">
                Confirm & Award SpherePoints
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    const existing = document.getElementById('fulfillDonationModal');
    if (existing) existing.remove();

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    const modal = new bootstrap.Modal(document.getElementById('fulfillDonationModal'));
    modal.show();
  },

  confirmDonationFulfillment(reqId) {
    const donorSelect = document.getElementById('fulfillDonorSelect');
    const donorId = donorSelect ? donorSelect.value : null;

    const result = HemoStore.fulfillRequest(reqId, donorId);
    if (result) {
      const modalEl = document.getElementById('fulfillDonationModal');
      const modal = bootstrap.Modal.getInstance(modalEl);
      modal.hide();

      alert(`✅ Donation successfully verified! Request ${reqId} marked fulfilled. Donor awarded +${result.pointsAwarded} SpherePoints!`);
      this.renderHospitalView();
      this.renderEmergencyTicker();
      this.updateStatsCounters();
    }
  },

  // ==========================================
  // ADMIN VIEW
  // ==========================================
  renderAdminView() {
    this.renderAdminMetrics();
    this.renderAdminVerificationQueue();
    this.renderAdminAllDonorsTable();
  },

  renderAdminMetrics() {
    const donors = HemoStore.getDonors();
    const verified = donors.filter(d => d.status === 'Verified');
    const pending = donors.filter(d => d.status === 'Pending');
    const requests = HemoStore.getRequests();

    document.getElementById('adminTotalDonors').textContent = donors.length;
    document.getElementById('adminVerifiedDonors').textContent = verified.length;
    document.getElementById('adminPendingQueue').textContent = pending.length;
    document.getElementById('adminActiveRequests').textContent = requests.filter(r => r.status === 'Active').length;
  },

  renderAdminVerificationQueue() {
    const container = document.getElementById('adminVerificationQueueBody');
    if (!container) return;

    const pending = HemoStore.getPendingDonors();
    if (pending.length === 0) {
      container.innerHTML = `
        <tr>
          <td colspan="6" class="text-center py-4 text-muted">
            <i class="fa-solid fa-circle-check text-success fs-3 mb-2 d-block"></i>
            All donor registrations have been verified. No pending reviews in queue.
          </td>
        </tr>
      `;
      return;
    }

    container.innerHTML = pending.map(donor => `
      <tr>
        <td><span class="fw-bold">${donor.id}</span></td>
        <td>
          <div class="fw-bold">${donor.name}</div>
          <div class="small text-muted">Roll No: ${donor.rollNo}</div>
        </td>
        <td><span class="bg-badge bg-badge-red">${donor.bloodGroup}</span></td>
        <td>
          <div class="small">${donor.college}</div>
          <div class="small text-muted">${donor.phone}</div>
        </td>
        <td><span class="badge bg-warning text-dark"><i class="fa-regular fa-clock me-1"></i> Awaiting ID Check</span></td>
        <td class="text-end">
          <button class="btn btn-sm btn-success me-1" onclick="HemoApp.adminVerifyDonor('${donor.id}', true)">
            <i class="fa-solid fa-check me-1"></i> Approve
          </button>
          <button class="btn btn-sm btn-outline-danger" onclick="HemoApp.adminVerifyDonor('${donor.id}', false)">
            <i class="fa-solid fa-xmark me-1"></i> Reject
          </button>
        </td>
      </tr>
    `).join('');
  },

  adminVerifyDonor(donorId, approve) {
    const donor = HemoStore.verifyDonor(donorId, approve);
    if (donor) {
      alert(approve 
        ? `✅ Donor ${donor.name} (${donor.bloodGroup}) verified! Now accessible in Hospital searches.` 
        : `❌ Donor registration rejected.`);
      this.renderAdminView();
      this.updateStatsCounters();
    }
  },

  renderAdminAllDonorsTable() {
    const container = document.getElementById('adminAllDonorsTableBody');
    if (!container) return;

    const donors = HemoStore.getDonors();
    container.innerHTML = donors.map(d => `
      <tr>
        <td>${d.id}</td>
        <td>
          <strong>${d.name}</strong>
          <div class="small text-muted">${d.area}, ${d.city}</div>
        </td>
        <td><span class="bg-badge bg-badge-red">${d.bloodGroup}</span></td>
        <td>${d.college}</td>
        <td>
          <span class="badge ${d.status === 'Verified' ? 'bg-success' : (d.status === 'Pending' ? 'bg-warning text-dark' : 'bg-danger')}">
            ${d.status}
          </span>
        </td>
        <td class="fw-bold">${d.trustScore}%</td>
        <td class="fw-bold text-danger">${d.hemoPoints} pts</td>
      </tr>
    `).join('');
  },

  // ==========================================
  // DONOR VIEW
  // ==========================================
  renderDonorView() {
    const donor = HemoStore.getCurrentUser();
    if (!donor) return;

    HemoGamification.renderImpactCard(donor, 'donorImpactCardContainer');
    HemoGamification.renderTrustScoreBreakdown(donor, 'donorTrustScoreContainer');
    HemoGamification.renderReferralTree(donor, 'donorReferralTreeContainer');
    this.renderDonorWallet(donor);
    this.renderRewardsCatalog(donor);
  },

  renderDonorWallet(donor) {
    const balanceEl = document.getElementById('walletPointsBalance');
    if (balanceEl) balanceEl.textContent = donor.hemoPoints;

    const historyEl = document.getElementById('walletHistoryList');
    if (!historyEl) return;

    const history = donor.history || [];
    historyEl.innerHTML = history.map(item => {
      const isPositive = item.pointsEarned > 0;
      return `
        <li class="list-group-item d-flex justify-content-between align-items-center py-2 px-3 border-0 border-bottom">
          <div>
            <div class="fw-semibold small">${item.type}</div>
            <div class="text-muted" style="font-size: 0.75rem;">${item.hospital} • ${item.date}</div>
          </div>
          <span class="fw-bold ${isPositive ? 'text-success' : 'text-danger'}">
            ${isPositive ? '+' : ''}${item.pointsEarned} pts
          </span>
        </li>
      `;
    }).join('');
  },

  renderRewardsCatalog(donor) {
    const container = document.getElementById('rewardsCatalogGrid');
    if (!container) return;

    const rewards = HemoStore.getRewards();
    container.innerHTML = rewards.map(reward => {
      const canAfford = donor.hemoPoints >= reward.points;
      return `
        <div class="col-md-6 col-lg-4">
          <div class="card h-100 border-0 shadow-sm rounded-4 p-3 position-relative">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="badge bg-light text-muted border">${reward.category}</span>
              <span class="badge bg-danger-subtle text-danger fw-bold fs-6">
                <i class="fa-solid fa-coins me-1"></i> ${reward.points} Pts
              </span>
            </div>
            <div class="my-2 text-center py-2 bg-light rounded-3">
              <i class="fa-solid ${reward.icon} fs-1 text-danger"></i>
            </div>
            <h6 class="fw-bold mb-1">${reward.title}</h6>
            <div class="small text-danger fw-semibold mb-2">${reward.partner}</div>
            <p class="small text-muted flex-grow-1 mb-3">${reward.description}</p>
            <div class="border-top pt-2">
              <div class="small text-muted mb-2" style="font-size: 0.72rem;">Sponsor: ${reward.sponsor}</div>
              <button class="btn btn-sm w-100 ${canAfford ? 'btn-danger' : 'btn-secondary disabled'}" 
                      onclick="HemoApp.redeemReward('${reward.id}')">
                ${canAfford ? '<i class="fa-solid fa-gift me-1"></i> Redeem Voucher' : 'Need More SpherePoints'}
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  },

  redeemReward(rewardId) {
    const donor = HemoStore.getCurrentUser();
    try {
      const redemption = HemoStore.redeemReward(donor.id, rewardId);
      
      // Trigger confetti if library loaded
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }

      alert(`🎉 Congratulations ${donor.name}! Voucher Redeemed Successfully!\n\nVoucher Code: ${redemption.voucherCode}\nReward: ${redemption.rewardTitle}\nPartner: ${redemption.partner}\n\nPresent this code at the partner venue to claim your perk.`);
      this.renderDonorView();
    } catch (err) {
      alert(err.message);
    }
  },

  openCertificateForCurrentDonor() {
    const donor = HemoStore.getCurrentUser();
    if (donor) {
      HemoCertificate.openCertificateModal(donor);
    }
  },

  toggleDonorAvailability() {
    const donor = HemoStore.getCurrentUser();
    donor.availability = donor.availability === 'Available' ? 'On Cooldown' : 'Available';
    const donors = HemoStore.getDonors();
    const idx = donors.findIndex(d => d.id === donor.id);
    if (idx !== -1) donors[idx] = donor;
    localStorage.setItem(STORAGE_KEYS.DONORS, JSON.stringify(donors));
    HemoStore.setCurrentUser(donor);
    alert(`Availability status updated to: ${donor.availability}`);
    this.renderDonorView();
  },

  // ==========================================
  // FORM HANDLERS
  // ==========================================
  handleDonorRegistration() {
    const name = document.getElementById('regName').value;
    const rollNo = document.getElementById('regRollNo').value;
    const college = document.getElementById('regCollege').value;
    const bloodGroup = document.getElementById('regBloodGroup').value;
    const phone = document.getElementById('regPhone').value;
    const area = document.getElementById('regArea').value;
    const referralCode = document.getElementById('regReferral').value;

    const newDonor = HemoStore.addDonor({
      name,
      rollNo,
      college,
      bloodGroup,
      phone,
      city: 'Boisar',
      area,
      referralCode
    });

    // Close Modal
    const modalEl = document.getElementById('registerDonorModal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();

    // Trigger confetti
    if (typeof confetti === 'function') {
      confetti({ particleCount: 80, spread: 60 });
    }

    alert(`🎉 Registration Submitted!\n\nWelcome ${name}! Your Donor ID is ${newDonor.id}.\n\nNote (Slide 7): Your profile is currently in the Admin Verification Queue. Once the Theem College / BloodSphere.io Admin approves your ID, you will be searchable by local hospitals and earn +25 bonus verification points!`);

    this.switchRole('admin');
  },

  handleHospitalRequest() {
    const patientName = document.getElementById('reqPatientName').value;
    const hospitalName = document.getElementById('reqHospitalName').value;
    const bloodGroup = document.getElementById('reqBloodGroup').value;
    const unitsNeeded = document.getElementById('reqUnitsNeeded').value;
    const urgency = document.getElementById('reqUrgency').value;
    const contactPhone = document.getElementById('reqPhone').value;
    const notes = document.getElementById('reqNotes').value;

    const newReq = HemoStore.addRequest({
      patientName,
      hospitalName,
      bloodGroup,
      unitsNeeded,
      urgency,
      contactPhone,
      notes
    });

    const modalEl = document.getElementById('createRequestModal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();

    alert(`🚨 Emergency Blood Request Broadcasted!\n\nRequest ID: ${newReq.id}\nHospital: ${hospitalName}\nBlood Group: ${bloodGroup} (${unitsNeeded} Units)\nUrgency: ${urgency}\n\nNearby verified donors have been alerted via emergency ticker and directory matching.`);

    this.renderEmergencyTicker();
    this.renderHospitalView();
    this.updateStatsCounters();
  },

  // ==========================================
  // LEAFLET MAP INITIALIZATION
  // ==========================================
  initMap() {
    const mapEl = document.getElementById('leafletMap');
    if (!mapEl) return;

    // Centered at Boisar / Palghar Coordinates [19.8000, 72.7500]
    this.map = L.map('leafletMap').setView([19.8020, 72.7530], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors | BloodSphere.io Theem COE'
    }).addTo(this.map);

    // Add Hospital Markers
    const hospitals = [
      { name: 'Anand Hospital & Critical Care', lat: 19.7995, lng: 72.7580, type: 'hospital', req: 'AB- (2 Units Needed)' },
      { name: 'Thunga Hospital, Boisar', lat: 19.8040, lng: 72.7490, type: 'hospital', req: 'Stock Adequate' },
      { name: 'Palghar District Civil Hospital', lat: 19.6965, lng: 72.7655, type: 'hospital', req: 'O+ Urgent (Trauma ICU)' },
      { name: 'Theem College of Engineering Campus', lat: 19.8090, lng: 72.7720, type: 'college', req: 'Blood Camp & Verified Donor Hub' }
    ];

    hospitals.forEach(h => {
      const iconHtml = h.type === 'college' 
        ? '<div style="background:#2563eb;color:white;border-radius:50%;width:30px;height:30px;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(0,0,0,0.3);"><i class="fa-solid fa-graduation-cap"></i></div>'
        : '<div style="background:#dc2626;color:white;border-radius:50%;width:30px;height:30px;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(0,0,0,0.3);"><i class="fa-solid fa-hospital"></i></div>';

      const customIcon = L.divIcon({
        className: 'custom-div-icon',
        html: iconHtml,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });

      L.marker([h.lat, h.lng], { icon: customIcon })
        .addTo(this.map)
        .bindPopup(`<strong>${h.name}</strong><br><span class="small text-danger">${h.req}</span>`);
    });
  }
};

window.HemoApp = HemoApp;

// Auto-run on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  HemoApp.init();
});

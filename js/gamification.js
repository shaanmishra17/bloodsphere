/**
 * HEMO LINK - Gamification, Trust Score, and Community Challenges
 * Department of IT Engineering - Theem College of Engineering, Boisar
 */

const HemoGamification = {
  // Trust Score Calculator
  calculateTrustScore(donor) {
    let score = 0;
    // 1. Identity & Medical Verification (30 pts)
    if (donor.status === 'Verified') score += 30;
    else if (donor.status === 'Pending') score += 10;

    // 2. Successful Donations (Up to 30 pts)
    score += Math.min(30, (donor.totalDonations || 0) * 10);

    // 3. Response Rate & Emergency Readiness (Up to 25 pts)
    if (donor.emergencyDonations > 0) score += 25;
    else if (donor.availability === 'Available') score += 15;
    else score += 10;

    // 4. Profile Completeness & College Verification (15 pts)
    if (donor.phone && donor.bloodGroup && donor.college) score += 15;

    return Math.min(100, Math.max(20, score));
  },

  // Render Impact Card
  renderImpactCard(donor, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const nextTierText = donor.donationsToNextTier > 0 
      ? `${donor.donationsToNextTier} more eligible donation${donor.donationsToNextTier > 1 ? 's' : ''} → Platinum Hero`
      : 'Top Tier Reached (Platinum Hero)';

    const tierBadgeClass = donor.tier === 'Platinum Hero' ? 'badge-tier-platinum' : 'badge-tier-gold';

    container.innerHTML = `
      <div class="impact-card">
        <div class="d-flex justify-content-between align-items-start mb-3">
          <div>
            <span class="badge ${tierBadgeClass} mb-2">
              <i class="fa-solid fa-crown me-1"></i> ${donor.tier}
            </span>
            <h4 class="mb-0 fw-bold text-white">${donor.name}</h4>
            <div class="text-white-50 small">ID: ${donor.id} • ${donor.college}</div>
          </div>
          <div class="text-end">
            <span class="bg-badge bg-badge-red fs-6">${donor.bloodGroup}</span>
          </div>
        </div>

        <div class="row g-3 my-2 pt-2 border-top border-secondary border-opacity-25">
          <div class="col-4 text-center">
            <div class="text-white-50 small">SpherePoints</div>
            <div class="fs-4 fw-bold text-warning">${donor.hemoPoints}</div>
          </div>
          <div class="col-4 text-center border-start border-end border-secondary border-opacity-25">
            <div class="text-white-50 small">Lives Impacted</div>
            <div class="fs-4 fw-bold text-danger">${donor.livesSaved}</div>
          </div>
          <div class="col-4 text-center">
            <div class="text-white-50 small">Trust Score</div>
            <div class="fs-4 fw-bold text-success">${donor.trustScore}%</div>
          </div>
        </div>

        <div class="mt-3 pt-2 bg-dark bg-opacity-50 p-2 rounded-3 small d-flex justify-content-between align-items-center">
          <span class="text-white-50"><i class="fa-solid fa-shield-heart text-danger me-1"></i> ${nextTierText}</span>
          <span class="badge bg-success-subtle text-success border border-success-subtle">${donor.status}</span>
        </div>
      </div>
    `;
  },

  // Render Trust Score Breakdown
  renderTrustScoreBreakdown(donor, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const isVerified = donor.status === 'Verified';
    const donationScore = Math.min(30, (donor.totalDonations || 0) * 10);
    const emergencyScore = donor.emergencyDonations > 0 ? 25 : 15;

    container.innerHTML = `
      <div class="card border-0 shadow-sm rounded-4 p-4">
        <div class="d-flex align-items-center justify-content-between mb-3">
          <h5 class="fw-bold mb-0">Donor Trust Score</h5>
          <span class="badge bg-success fs-6">${donor.trustScore}/100</span>
        </div>
        <p class="text-muted small mb-4">
          Trust Score determines donor priority in hospital emergency searches. High scores signal verified identity and fast response times.
        </p>

        <div class="space-y-3">
          <div class="mb-3">
            <div class="d-flex justify-content-between small fw-semibold mb-1">
              <span><i class="fa-solid fa-id-card text-primary me-2"></i>Admin & College Verification</span>
              <span class="text-muted">${isVerified ? '30 / 30 pts' : '10 / 30 pts'}</span>
            </div>
            <div class="progress" style="height: 6px;">
              <div class="progress-bar bg-primary" style="width: ${isVerified ? '100%' : '33%'}"></div>
            </div>
          </div>

          <div class="mb-3">
            <div class="d-flex justify-content-between small fw-semibold mb-1">
              <span><i class="fa-solid fa-droplet text-danger me-2"></i>Successful Donations Record</span>
              <span class="text-muted">${donationScore} / 30 pts</span>
            </div>
            <div class="progress" style="height: 6px;">
              <div class="progress-bar bg-danger" style="width: ${(donationScore / 30) * 100}%"></div>
            </div>
          </div>

          <div class="mb-3">
            <div class="d-flex justify-content-between small fw-semibold mb-1">
              <span><i class="fa-solid fa-bolt text-warning me-2"></i>Emergency Response Readiness</span>
              <span class="text-muted">${emergencyScore} / 25 pts</span>
            </div>
            <div class="progress" style="height: 6px;">
              <div class="progress-bar bg-warning" style="width: ${(emergencyScore / 25) * 100}%"></div>
            </div>
          </div>

          <div class="mb-2">
            <div class="d-flex justify-content-between small fw-semibold mb-1">
              <span><i class="fa-solid fa-user-check text-success me-2"></i>Profile Completeness</span>
              <span class="text-muted">15 / 15 pts</span>
            </div>
            <div class="progress" style="height: 6px;">
              <div class="progress-bar bg-success" style="width: 100%"></div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // Render Referral Tree
  renderReferralTree(donor, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const invited = donor.invitedCount || 3;
    const registered = donor.registeredReferrals || 2;
    const verified = donor.verifiedReferrals || 1;
    const referralPointsEarned = verified * 50;

    container.innerHTML = `
      <div class="card border-0 shadow-sm rounded-4 p-4">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h5 class="fw-bold mb-0">Donor Referral Tree</h5>
            <small class="text-muted">Invite friends to expand the emergency network & earn 50 SpherePoints per verified friend</small>
          </div>
          <span class="badge bg-danger-subtle text-danger border border-danger-subtle">
            +${referralPointsEarned} Pts Earned
          </span>
        </div>

        <div class="row g-3 align-items-center my-2">
          <div class="col-md-3">
            <div class="referral-tree-step">
              <div class="text-primary fs-3 mb-1"><i class="fa-solid fa-paper-plane"></i></div>
              <div class="fw-bold fs-4">${invited}</div>
              <div class="small text-muted">Friends Invited</div>
            </div>
          </div>
          <div class="col-md-1 text-center referral-arrow">
            <i class="fa-solid fa-arrow-right"></i>
          </div>
          <div class="col-md-3">
            <div class="referral-tree-step">
              <div class="text-warning fs-3 mb-1"><i class="fa-solid fa-user-clock"></i></div>
              <div class="fw-bold fs-4">${registered}</div>
              <div class="small text-muted">Registered On Platform</div>
            </div>
          </div>
          <div class="col-md-1 text-center referral-arrow">
            <i class="fa-solid fa-arrow-right"></i>
          </div>
          <div class="col-md-4">
            <div class="referral-tree-step border-success" style="background: #f0fdf4;">
              <div class="text-success fs-3 mb-1"><i class="fa-solid fa-circle-check"></i></div>
              <div class="fw-bold fs-4 text-success">${verified}</div>
              <div class="small fw-semibold text-success">Verified Active Donors</div>
              <div class="badge bg-success mt-1">+50 SpherePoints Each</div>
            </div>
          </div>
        </div>

        <div class="input-group mt-3">
          <span class="input-group-text bg-light text-muted small">Your Referral Code</span>
          <input type="text" class="form-control fw-bold text-center" value="${donor.id}" readonly id="refCodeInput">
          <button class="btn btn-outline-danger" onclick="HemoGamification.copyReferralCode('${donor.id}')">
            <i class="fa-regular fa-copy me-1"></i> Copy Link
          </button>
        </div>
      </div>
    `;
  },

  copyReferralCode(code) {
    navigator.clipboard.writeText(`https://bloodsphere.io/register?ref=${code}`);
    alert(`Referral link copied! Share with classmates to earn +50 SpherePoints once they are verified.`);
  },

  // Render College Blood Challenge
  renderCollegeChallenge(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const data = HemoStore.getCollegeChallenge();
    const collegeA = data.collegeA;
    const collegeB = data.collegeB;
    const totalDonors = collegeA.registeredDonors + collegeB.registeredDonors;
    const percentA = Math.round((collegeA.registeredDonors / totalDonors) * 100);

    container.innerHTML = `
      <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div class="bg-gradient text-white p-4" style="background: linear-gradient(135deg, #7f1d1d 0%, #1e1b4b 100%);">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <span class="badge bg-danger mb-2"><i class="fa-solid fa-shield-halved me-1"></i> INTER-COLLEGE BLOOD DERBY</span>
              <h4 class="fw-bold mb-0">College Blood Challenge 2026</h4>
              <p class="small text-white-50 mb-0">Boisar & Palghar District Engineering League</p>
            </div>
            <div class="text-end">
              <span class="badge bg-warning text-dark px-3 py-2 fw-bold">Active Round 1</span>
            </div>
          </div>
        </div>

        <div class="p-4 bg-white">
          <div class="row align-items-center g-3 mb-4">
            <div class="col-md-5 text-center text-md-start">
              <div class="d-flex align-items-center">
                <div class="rounded-circle bg-danger-subtle p-3 text-danger fs-3 me-3 d-none d-sm-block">
                  <i class="fa-solid fa-graduation-cap"></i>
                </div>
                <div>
                  <h6 class="fw-bold mb-1 text-danger">${collegeA.name}</h6>
                  <span class="badge bg-danger-subtle text-danger border border-danger-subtle me-2">Leading</span>
                  <span class="small text-muted">${collegeA.score.toLocaleString()} Impact Pts</span>
                </div>
              </div>
            </div>

            <div class="col-md-2 text-center">
              <div class="challenge-vs-badge mx-auto">VS</div>
            </div>

            <div class="col-md-5 text-center text-md-end">
              <div class="d-flex align-items-center justify-content-md-end">
                <div>
                  <h6 class="fw-bold mb-1 text-primary">${collegeB.name}</h6>
                  <span class="badge bg-primary-subtle text-primary border border-primary-subtle me-2">Challenger</span>
                  <span class="small text-muted">${collegeB.score.toLocaleString()} Impact Pts</span>
                </div>
                <div class="rounded-circle bg-primary-subtle p-3 text-primary fs-3 ms-3 d-none d-sm-block">
                  <i class="fa-solid fa-building-columns"></i>
                </div>
              </div>
            </div>
          </div>

          <!-- Progress Comparison -->
          <div class="mb-4">
            <div class="d-flex justify-content-between small fw-bold mb-1">
              <span class="text-danger">${collegeA.registeredDonors} Registered Donors</span>
              <span class="text-primary">${collegeB.registeredDonors} Registered Donors</span>
            </div>
            <div class="progress" style="height: 12px;">
              <div class="progress-bar bg-danger" style="width: ${percentA}%" role="progressbar"></div>
              <div class="progress-bar bg-primary" style="width: ${100 - percentA}%" role="progressbar"></div>
            </div>
          </div>

          <!-- Metric Grid -->
          <div class="row g-3 text-center">
            <div class="col-4">
              <div class="p-2 border rounded-3 bg-light">
                <div class="text-muted small">Successful Donations</div>
                <div class="fw-bold fs-5 text-dark">${collegeA.successfulDonations} <span class="text-muted small">vs</span> ${collegeB.successfulDonations}</div>
              </div>
            </div>
            <div class="col-4">
              <div class="p-2 border rounded-3 bg-light">
                <div class="text-muted small">Emergency Responded</div>
                <div class="fw-bold fs-5 text-danger">${collegeA.emergencyResponses} <span class="text-muted small">vs</span> ${collegeB.emergencyResponses}</div>
              </div>
            </div>
            <div class="col-4">
              <div class="p-2 border rounded-3 bg-light">
                <div class="text-muted small">Lead Margin</div>
                <div class="fw-bold fs-5 text-success">+${collegeA.score - collegeB.score} Pts</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // Render Life Saver League Leaderboard
  renderLeaderboard(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const donors = HemoStore.getDonors().slice().sort((a, b) => b.hemoPoints - a.hemoPoints);

    let rowsHtml = '';
    donors.forEach((donor, index) => {
      let rankBadge = '';
      if (index === 0) rankBadge = '<i class="fa-solid fa-trophy text-warning fs-5"></i>';
      else if (index === 1) rankBadge = '<i class="fa-solid fa-medal text-secondary fs-5"></i>';
      else if (index === 2) rankBadge = '<i class="fa-solid fa-award text-warning fs-5" style="color: #cd7f32 !important;"></i>';
      else rankBadge = `<span class="fw-bold text-muted">${index + 1}</span>`;

      rowsHtml += `
        <tr>
          <td class="text-center" style="width: 50px;">${rankBadge}</td>
          <td>
            <div class="fw-bold">${donor.name}</div>
            <div class="small text-muted">${donor.college}</div>
          </td>
          <td>
            <span class="bg-badge bg-badge-red">${donor.bloodGroup}</span>
          </td>
          <td>
            <span class="badge ${donor.tier === 'Platinum Hero' ? 'badge-tier-platinum' : 'badge-tier-gold'}">
              ${donor.tier}
            </span>
          </td>
          <td class="text-center fw-bold">${donor.totalDonations}</td>
          <td class="text-end fw-bold text-danger">${donor.hemoPoints} pts</td>
        </tr>
      `;
    });

    container.innerHTML = `
      <div class="card border-0 shadow-sm rounded-4 p-4">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h5 class="fw-bold mb-0">🏆 Life Saver League — Monthly Leaderboard</h5>
            <small class="text-muted">Top contributors helping bridge the 12,000 daily blood shortage gap</small>
          </div>
          <span class="badge bg-danger px-3 py-2">September 2026</span>
        </div>

        <div class="table-responsive">
          <table class="table custom-table table-hover align-middle mb-0">
            <thead>
              <tr>
                <th class="text-center">Rank</th>
                <th>Donor</th>
                <th>Blood Group</th>
                <th>Life Saver Tier</th>
                <th class="text-center">Donations</th>
                <th class="text-end">HemoPoints</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
};

window.HemoGamification = HemoGamification;

/**
 * HEMO LINK - Life Saver Digital Certificate Generator
 * Theem College of Engineering, Boisar - Department of IT
 */

const HemoCertificate = {
  openCertificateModal(donor) {
    const modalEl = document.getElementById('certificateModal');
    if (!modalEl) return;

    const certDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const certHtml = `
      <div class="certificate-frame my-2" id="printableCertificate">
        <div class="certificate-inner-border">
          <div class="mb-3">
            <span class="text-danger fw-bold text-uppercase tracking-wider small">
              <i class="fa-solid fa-droplet me-1"></i> Emergency Response Network • BloodSphere.io • Theem College of Engineering
            </span>
          </div>

          <h2 class="fw-bold mb-1" style="font-family: 'Georgia', serif; color: #831843; letter-spacing: 1px;">
            CERTIFICATE OF RECOGNITION
          </h2>
          <p class="text-muted fst-italic mb-4" style="font-size: 0.95rem;">
            This certifies that
          </p>

          <h3 class="fw-bold text-dark text-decoration-underline mb-2" style="font-family: 'Georgia', serif;">
            ${donor.name}
          </h3>
          <p class="text-secondary small mb-3">
            Roll No: <strong>${donor.rollNo || '253135'}</strong> • ${donor.college || 'Theem College of Engineering, Boisar'}
          </p>

          <p class="lead fs-6 mx-auto mb-4 text-dark" style="max-width: 580px; line-height: 1.6;">
            has stepped forward as an active, verified blood donor with blood group 
            <span class="badge bg-danger fs-6 px-2 py-1 mx-1">${donor.bloodGroup}</span>,
            holding the prestigious rank of <strong>${donor.tier}</strong>, contributing toward saving human lives
            and directly supporting the fight against the 12,000 daily blood shortage deficit.
          </p>

          <div class="row align-items-end mt-4 pt-3 border-top border-secondary border-opacity-25">
            <div class="col-4 text-center">
              <div class="fw-bold small text-dark">${certDate}</div>
              <div class="border-top border-dark mx-auto mt-1" style="width: 120px;"></div>
              <div class="text-muted" style="font-size: 0.75rem;">Issue Date</div>
            </div>

            <div class="col-4 text-center">
              <div class="seal-stamp">
                <i class="fa-solid fa-award fs-4 mb-1"></i>
                <span>VERIFIED</span>
                <span style="font-size: 0.48rem;">BLOODSPHERE.IO</span>
              </div>
            </div>

            <div class="col-4 text-center">
              <div class="fw-bold small text-dark fst-italic" style="font-family: cursive;">Prof. In-Charge</div>
              <div class="border-top border-dark mx-auto mt-1" style="width: 120px;"></div>
              <div class="text-muted" style="font-size: 0.75rem;">Department of IT, Theem COE</div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('certificateContainer').innerHTML = certHtml;
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  },

  printCertificate() {
    window.print();
  }
};

window.HemoCertificate = HemoCertificate;

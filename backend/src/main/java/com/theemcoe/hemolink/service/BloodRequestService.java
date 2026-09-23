package com.theemcoe.hemolink.service;

import com.theemcoe.hemolink.model.BloodRequest;
import com.theemcoe.hemolink.model.Donor;
import com.theemcoe.hemolink.repository.BloodRequestRepository;
import com.theemcoe.hemolink.repository.DonorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class BloodRequestService {

    @Autowired
    private BloodRequestRepository bloodRequestRepository;

    @Autowired
    private DonorRepository donorRepository;

    public List<BloodRequest> getAllRequests() {
        return bloodRequestRepository.findAll();
    }

    public List<BloodRequest> getActiveRequests() {
        return bloodRequestRepository.findByStatus("Active");
    }

    public BloodRequest createEmergencyRequest(BloodRequest request) {
        String generatedId = "REQ-" + (100 + new Random().nextInt(900));
        request.setId(generatedId);
        request.setStatus("Active");
        return bloodRequestRepository.save(request);
    }

    /**
     * Fulfill donation and award HemoPoints according to project ideas:
     * Standard: 100 pts, Emergency: 150 pts, Rare Blood Group: 200 pts
     */
    public BloodRequest fulfillRequest(String requestId, String donorId) {
        Optional<BloodRequest> optionalReq = bloodRequestRepository.findById(requestId);
        if (optionalReq.isEmpty()) {
            throw new RuntimeException("Request not found with ID: " + requestId);
        }

        BloodRequest req = optionalReq.get();
        req.setStatus("Fulfilled");
        req.setUnitsFulfilled(req.getUnitsNeeded());
        req.setAssignedDonorId(donorId);
        bloodRequestRepository.save(req);

        // Credit points to Donor
        if (donorId != null) {
            Optional<Donor> optionalDonor = donorRepository.findById(donorId);
            if (optionalDonor.isPresent()) {
                Donor donor = optionalDonor.get();

                int points = 100;
                if ("Rare Blood Group".equalsIgnoreCase(req.getUrgency()) || "AB-".equals(req.getBloodGroup()) || "O-".equals(req.getBloodGroup())) {
                    points = 200;
                    donor.setRareGroupDonations(donor.getRareGroupDonations() + 1);
                } else if ("Emergency".equalsIgnoreCase(req.getUrgency())) {
                    points = 150;
                    donor.setEmergencyDonations(donor.getEmergencyDonations() + 1);
                }

                donor.setHemoPoints(donor.getHemoPoints() + points);
                donor.setTotalDonations(donor.getTotalDonations() + 1);
                donor.setLivesSaved(donor.getLivesSaved() + (req.getUnitsNeeded() * 3));
                donor.setLastDonationDate(LocalDate.now().toString());
                donor.setAvailability("On Cooldown");
                donor.setTrustScore(Math.min(100, donor.getTrustScore() + 5));

                // Tier Upgrade Check
                if (donor.getTotalDonations() >= 5) {
                    donor.setTier("Platinum Hero");
                    donor.setDonationsToNextTier(0);
                } else if (donor.getTotalDonations() >= 3) {
                    donor.setTier("Gold Life Saver");
                    donor.setDonationsToNextTier(5 - donor.getTotalDonations());
                } else if (donor.getTotalDonations() >= 1) {
                    donor.setTier("Silver Life Saver");
                    donor.setDonationsToNextTier(3 - donor.getTotalDonations());
                }

                donorRepository.save(donor);
            }
        }

        return req;
    }
}

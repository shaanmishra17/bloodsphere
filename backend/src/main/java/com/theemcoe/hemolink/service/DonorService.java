package com.theemcoe.hemolink.service;

import com.theemcoe.hemolink.model.Donor;
import com.theemcoe.hemolink.repository.DonorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class DonorService {

    @Autowired
    private DonorRepository donorRepository;

    public List<Donor> getAllDonors() {
        return donorRepository.findAll();
    }

    public List<Donor> getVerifiedDonors() {
        return donorRepository.findByStatus("Verified");
    }

    public List<Donor> getPendingDonors() {
        return donorRepository.findByStatus("Pending");
    }

    public List<Donor> searchVerifiedDonors(String bloodGroup) {
        if (bloodGroup == null || bloodGroup.equalsIgnoreCase("ALL")) {
            return donorRepository.findByStatus("Verified");
        }
        return donorRepository.findByStatusAndBloodGroup("Verified", bloodGroup);
    }

    public Donor registerDonor(Donor donor) {
        String generatedId = "D-" + (100000 + new Random().nextInt(900000));
        donor.setId(generatedId);
        donor.setStatus("Pending"); // Requires Admin ID verification as per Slide 7
        donor.setAvailability("Available");
        donor.setTrustScore(70);
        donor.setHemoPoints(50); // Welcome bonus
        donor.setTier("Bronze Life Saver");
        return donorRepository.save(donor);
    }

    public Optional<Donor> verifyDonor(String donorId, boolean approve) {
        Optional<Donor> optionalDonor = donorRepository.findById(donorId);
        if (optionalDonor.isPresent()) {
            Donor donor = optionalDonor.get();
            if (approve) {
                donor.setStatus("Verified");
                donor.setTrustScore(Math.min(100, donor.getTrustScore() + 20));
                donor.setHemoPoints(donor.getHemoPoints() + 25);
            } else {
                donor.setStatus("Rejected");
            }
            donorRepository.save(donor);
        }
        return optionalDonor;
    }
}

package com.theemcoe.hemolink.controller;

import com.theemcoe.hemolink.model.Donor;
import com.theemcoe.hemolink.service.DonorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/donors")
@CrossOrigin(origins = "*")
public class DonorController {

    @Autowired
    private DonorService donorService;

    @GetMapping
    public List<Donor> getAllDonors() {
        return donorService.getAllDonors();
    }

    @GetMapping("/verified")
    public List<Donor> getVerifiedDonors() {
        return donorService.getVerifiedDonors();
    }

    @GetMapping("/pending")
    public List<Donor> getPendingDonors() {
        return donorService.getPendingDonors();
    }

    @GetMapping("/search")
    public List<Donor> searchDonors(@RequestParam(required = false, defaultValue = "ALL") String bloodGroup) {
        return donorService.searchVerifiedDonors(bloodGroup);
    }

    @PostMapping("/register")
    public ResponseEntity<Donor> registerDonor(@RequestBody Donor donor) {
        Donor savedDonor = donorService.registerDonor(donor);
        return ResponseEntity.ok(savedDonor);
    }

    @PutMapping("/{id}/verify")
    public ResponseEntity<?> verifyDonor(
            @PathVariable String id,
            @RequestParam(defaultValue = "true") boolean approve) {
        Optional<Donor> updated = donorService.verifyDonor(id, approve);
        if (updated.isPresent()) {
            return ResponseEntity.ok(updated.get());
        }
        return ResponseEntity.notFound().build();
    }
}

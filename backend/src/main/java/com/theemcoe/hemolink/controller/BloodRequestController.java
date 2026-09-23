package com.theemcoe.hemolink.controller;

import com.theemcoe.hemolink.model.BloodRequest;
import com.theemcoe.hemolink.service.BloodRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
@CrossOrigin(origins = "*")
public class BloodRequestController {

    @Autowired
    private BloodRequestService bloodRequestService;

    @GetMapping
    public List<BloodRequest> getAllRequests() {
        return bloodRequestService.getAllRequests();
    }

    @GetMapping("/active")
    public List<BloodRequest> getActiveRequests() {
        return bloodRequestService.getActiveRequests();
    }

    @PostMapping("/create")
    public ResponseEntity<BloodRequest> createEmergencyRequest(@RequestBody BloodRequest request) {
        BloodRequest created = bloodRequestService.createEmergencyRequest(request);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}/fulfill")
    public ResponseEntity<BloodRequest> fulfillRequest(
            @PathVariable String id,
            @RequestParam(required = false) String donorId) {
        try {
            BloodRequest fulfilled = bloodRequestService.fulfillRequest(id, donorId);
            return ResponseEntity.ok(fulfilled);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}

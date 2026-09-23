package com.theemcoe.hemolink.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "blood_requests")
public class BloodRequest {

    @Id
    @Column(name = "request_id", length = 20)
    private String id;

    @Column(name = "patient_name", nullable = false, length = 100)
    private String patientName;

    @Column(name = "hospital_name", nullable = false, length = 150)
    private String hospitalName;

    @Column(name = "hospital_city", length = 50)
    private String hospitalCity = "Boisar";

    @Column(name = "blood_group", nullable = false, length = 5)
    private String bloodGroup;

    @Column(name = "units_needed", nullable = false)
    private int unitsNeeded = 1;

    @Column(name = "units_fulfilled")
    private int unitsFulfilled = 0;

    @Column(nullable = false, length = 30)
    private String urgency = "Emergency"; // 'Standard', 'Emergency', 'Rare Blood Group'

    @Column(name = "contact_phone", nullable = false, length = 20)
    private String contactPhone;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(nullable = false, length = 20)
    private String status = "Active"; // 'Active', 'Fulfilled', 'Cancelled'

    @Column(name = "assigned_donor_id", length = 20)
    private String assignedDonorId;

    @Column(name = "created_at")
    private String createdAt;

    public BloodRequest() {
        this.createdAt = LocalDateTime.now().toString();
    }

    public BloodRequest(String id, String patientName, String hospitalName, String bloodGroup, int unitsNeeded, String urgency, String contactPhone) {
        this.id = id;
        this.patientName = patientName;
        this.hospitalName = hospitalName;
        this.bloodGroup = bloodGroup;
        this.unitsNeeded = unitsNeeded;
        this.urgency = urgency;
        this.contactPhone = contactPhone;
        this.status = "Active";
        this.createdAt = LocalDateTime.now().toString();
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getPatientName() { return patientName; }
    public void setPatientName(String patientName) { this.patientName = patientName; }

    public String getHospitalName() { return hospitalName; }
    public void setHospitalName(String hospitalName) { this.hospitalName = hospitalName; }

    public String getHospitalCity() { return hospitalCity; }
    public void setHospitalCity(String hospitalCity) { this.hospitalCity = hospitalCity; }

    public String getBloodGroup() { return bloodGroup; }
    public void setBloodGroup(String bloodGroup) { this.bloodGroup = bloodGroup; }

    public int getUnitsNeeded() { return unitsNeeded; }
    public void setUnitsNeeded(int unitsNeeded) { this.unitsNeeded = unitsNeeded; }

    public int getUnitsFulfilled() { return unitsFulfilled; }
    public void setUnitsFulfilled(int unitsFulfilled) { this.unitsFulfilled = unitsFulfilled; }

    public String getUrgency() { return urgency; }
    public void setUrgency(String urgency) { this.urgency = urgency; }

    public String getContactPhone() { return contactPhone; }
    public void setContactPhone(String contactPhone) { this.contactPhone = contactPhone; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getAssignedDonorId() { return assignedDonorId; }
    public void setAssignedDonorId(String assignedDonorId) { this.assignedDonorId = assignedDonorId; }

    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }
}

package com.theemcoe.hemolink.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "donors")
public class Donor {

    @Id
    @Column(name = "donor_id", length = 20)
    private String id;

    @Column(name = "full_name", nullable = false, length = 100)
    private String name;

    @Column(name = "roll_no", length = 20)
    private String rollNo;

    @Column(name = "college_name", length = 150)
    private String college = "Theem College of Engineering, Boisar";

    @Column(name = "blood_group", nullable = false, length = 5)
    private String bloodGroup;

    @Column(nullable = false, length = 20)
    private String phone;

    @Column(length = 50)
    private String city = "Boisar";

    @Column(length = 100)
    private String area;

    @Column(nullable = false, length = 20)
    private String status = "Pending"; // 'Pending', 'Verified', 'Rejected'

    @Column(nullable = false, length = 20)
    private String availability = "Available"; // 'Available', 'On Cooldown'

    @Column(name = "trust_score")
    private int trustScore = 70;

    @Column(name = "hemo_points")
    private int hemoPoints = 50;

    @Column(name = "total_donations")
    private int totalDonations = 0;

    @Column(name = "emergency_donations")
    private int emergencyDonations = 0;

    @Column(name = "rare_group_donations")
    private int rareGroupDonations = 0;

    @Column(name = "lives_saved")
    private int livesSaved = 0;

    @Column(length = 30)
    private String tier = "Bronze Life Saver"; // Bronze, Silver, Gold, Platinum Hero

    @Column(name = "donations_to_next_tier")
    private int donationsToNextTier = 2;

    @Column(name = "last_donation_date")
    private String lastDonationDate = "Never";

    @Column(name = "invited_count")
    private int invitedCount = 0;

    @Column(name = "registered_referrals")
    private int registeredReferrals = 0;

    @Column(name = "verified_referrals")
    private int verifiedReferrals = 0;

    public Donor() {}

    public Donor(String id, String name, String rollNo, String college, String bloodGroup, String phone, String area) {
        this.id = id;
        this.name = name;
        this.rollNo = rollNo;
        this.college = college;
        this.bloodGroup = bloodGroup;
        this.phone = phone;
        this.area = area;
        this.status = "Pending";
        this.availability = "Available";
        this.trustScore = 70;
        this.hemoPoints = 50;
        this.tier = "Bronze Life Saver";
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getRollNo() { return rollNo; }
    public void setRollNo(String rollNo) { this.rollNo = rollNo; }

    public String getCollege() { return college; }
    public void setCollege(String college) { this.college = college; }

    public String getBloodGroup() { return bloodGroup; }
    public void setBloodGroup(String bloodGroup) { this.bloodGroup = bloodGroup; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getArea() { return area; }
    public void setArea(String area) { this.area = area; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getAvailability() { return availability; }
    public void setAvailability(String availability) { this.availability = availability; }

    public int getTrustScore() { return trustScore; }
    public void setTrustScore(int trustScore) { this.trustScore = trustScore; }

    public int getHemoPoints() { return hemoPoints; }
    public void setHemoPoints(int hemoPoints) { this.hemoPoints = hemoPoints; }

    public int getTotalDonations() { return totalDonations; }
    public void setTotalDonations(int totalDonations) { this.totalDonations = totalDonations; }

    public int getEmergencyDonations() { return emergencyDonations; }
    public void setEmergencyDonations(int emergencyDonations) { this.emergencyDonations = emergencyDonations; }

    public int getRareGroupDonations() { return rareGroupDonations; }
    public void setRareGroupDonations(int rareGroupDonations) { this.rareGroupDonations = rareGroupDonations; }

    public int getLivesSaved() { return livesSaved; }
    public void setLivesSaved(int livesSaved) { this.livesSaved = livesSaved; }

    public String getTier() { return tier; }
    public void setTier(String tier) { this.tier = tier; }

    public int getDonationsToNextTier() { return donationsToNextTier; }
    public void setDonationsToNextTier(int donationsToNextTier) { this.donationsToNextTier = donationsToNextTier; }

    public String getLastDonationDate() { return lastDonationDate; }
    public void setLastDonationDate(String lastDonationDate) { this.lastDonationDate = lastDonationDate; }

    public int getInvitedCount() { return invitedCount; }
    public void setInvitedCount(int invitedCount) { this.invitedCount = invitedCount; }

    public int getRegisteredReferrals() { return registeredReferrals; }
    public void setRegisteredReferrals(int registeredReferrals) { this.registeredReferrals = registeredReferrals; }

    public int getVerifiedReferrals() { return verifiedReferrals; }
    public void setVerifiedReferrals(int verifiedReferrals) { this.verifiedReferrals = verifiedReferrals; }
}

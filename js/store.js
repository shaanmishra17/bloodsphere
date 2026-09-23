/**
 * HEMO LINK - LocalStorage Data Store & Initial Seeds
 * Theem College of Engineering, Boisar - IT Dept Mini Project
 */

const STORAGE_KEYS = {
  CURRENT_ROLE: 'hemolink_role',
  CURRENT_USER: 'hemolink_current_user',
  DONORS: 'hemolink_donors',
  REQUESTS: 'hemolink_requests',
  HOSPITALS: 'hemolink_hospitals',
  REWARDS: 'hemolink_rewards',
  REDEMPTIONS: 'hemolink_redemptions',
  COLLEGE_CHALLENGE: 'hemolink_college_challenge'
};

const initialDonors = [
  {
    id: 'D-253135',
    name: 'Tanmay Ramesh Parandwal',
    rollNo: '253135',
    college: 'Theem College of Engineering, Boisar',
    bloodGroup: 'O+',
    phone: '+91 98234 56789',
    city: 'Boisar',
    area: 'Boisar Chilhar Road',
    status: 'Verified', // Verified, Pending, Rejected
    availability: 'Available', // Available, On Cooldown, Unavailable
    trustScore: 95,
    hemoPoints: 450,
    totalDonations: 4,
    emergencyDonations: 2,
    rareGroupDonations: 0,
    livesSaved: 12,
    tier: 'Gold Life Saver', // Bronze, Silver, Gold, Platinum Hero
    donationsToNextTier: 2,
    lastDonationDate: '2026-06-15',
    invitedCount: 4,
    registeredReferrals: 3,
    verifiedReferrals: 2,
    history: [
      { date: '2026-06-15', type: 'Emergency', hospital: 'Anand Hospital, Boisar', units: 1, pointsEarned: 150 },
      { date: '2026-03-01', type: 'Normal', hospital: 'Palghar Rural Hospital', units: 1, pointsEarned: 100 },
      { date: '2025-11-20', type: 'Normal', hospital: 'Theem College Blood Camp', units: 1, pointsEarned: 100 },
      { date: '2025-08-10', type: 'Referral Bonus', hospital: 'Shaan Mishra Verified', units: 0, pointsEarned: 50 }
    ]
  },
  {
    id: 'D-253130',
    name: 'Shaan Dharmendra Mishra',
    rollNo: '253130',
    college: 'Theem College of Engineering, Boisar',
    bloodGroup: 'B+',
    phone: '+91 98123 45670',
    city: 'Boisar',
    area: 'Tarapur MIDC Road',
    status: 'Verified',
    availability: 'Available',
    trustScore: 88,
    hemoPoints: 300,
    totalDonations: 2,
    emergencyDonations: 1,
    rareGroupDonations: 0,
    livesSaved: 6,
    tier: 'Silver Life Saver',
    donationsToNextTier: 1,
    lastDonationDate: '2026-07-10',
    invitedCount: 2,
    registeredReferrals: 2,
    verifiedReferrals: 1,
    history: [
      { date: '2026-07-10', type: 'Emergency', hospital: 'Thunga Hospital, Boisar', units: 1, pointsEarned: 150 },
      { date: '2026-02-14', type: 'Normal', hospital: 'Palghar Red Cross Camp', units: 1, pointsEarned: 100 }
    ]
  },
  {
    id: 'D-253144',
    name: 'Shubham Dibakar Pradhan',
    rollNo: '253144',
    college: 'Theem College of Engineering, Boisar',
    bloodGroup: 'AB-',
    phone: '+91 97654 32109',
    city: 'Palghar',
    area: 'Station Road, Palghar East',
    status: 'Verified',
    availability: 'Available',
    trustScore: 98,
    hemoPoints: 600,
    totalDonations: 3,
    emergencyDonations: 2,
    rareGroupDonations: 2,
    livesSaved: 9,
    tier: 'Platinum Hero',
    donationsToNextTier: 0,
    lastDonationDate: '2026-08-05',
    invitedCount: 5,
    registeredReferrals: 4,
    verifiedReferrals: 3,
    history: [
      { date: '2026-08-05', type: 'Rare Blood Emergency', hospital: 'Kokilaben Dhirubhai Ambani Hospital', units: 1, pointsEarned: 200 },
      { date: '2026-04-12', type: 'Rare Blood Emergency', hospital: 'Palghar District Hospital', units: 1, pointsEarned: 200 }
    ]
  },
  {
    id: 'D-253137',
    name: 'Sumit Omprakash Pathak',
    rollNo: '253137',
    college: 'Theem College of Engineering, Boisar',
    bloodGroup: 'A+',
    phone: '+91 99887 76655',
    city: 'Boisar',
    area: 'Navapur Road',
    status: 'Verified',
    availability: 'On Cooldown',
    trustScore: 91,
    hemoPoints: 350,
    totalDonations: 3,
    emergencyDonations: 1,
    rareGroupDonations: 0,
    livesSaved: 9,
    tier: 'Gold Life Saver',
    donationsToNextTier: 2,
    lastDonationDate: '2026-09-01',
    invitedCount: 3,
    registeredReferrals: 2,
    verifiedReferrals: 1,
    history: [
      { date: '2026-09-01', type: 'Normal', hospital: 'Sanjivani Hospital, Boisar', units: 1, pointsEarned: 100 }
    ]
  },
  {
    id: 'D-253199',
    name: 'Pooja Verma',
    rollNo: '253199',
    college: 'Theem College of Engineering, Boisar',
    bloodGroup: 'O-',
    phone: '+91 91234 56780',
    city: 'Boisar',
    area: 'Chitralekha Compound',
    status: 'Pending', // Awaiting Admin verification
    availability: 'Available',
    trustScore: 70,
    hemoPoints: 50,
    totalDonations: 0,
    emergencyDonations: 0,
    rareGroupDonations: 0,
    livesSaved: 0,
    tier: 'Bronze Life Saver',
    donationsToNextTier: 2,
    lastDonationDate: 'Never',
    invitedCount: 1,
    registeredReferrals: 0,
    verifiedReferrals: 0,
    history: [
      { date: '2026-09-22', type: 'Registration Bonus', hospital: 'Account Created', units: 0, pointsEarned: 50 }
    ]
  }
];

const initialRequests = [
  {
    id: 'REQ-801',
    patientName: 'Kishore Joshi',
    hospitalName: 'Anand Hospital & Critical Care',
    hospitalCity: 'Boisar',
    bloodGroup: 'AB-',
    unitsNeeded: 2,
    unitsFulfilled: 0,
    urgency: 'Rare Blood Group', // Standard, Emergency, Rare Blood Group
    contactPhone: '+91 2525 252111',
    notes: 'Urgent bypass surgery patient. Rare AB- required within 3 hours.',
    status: 'Active', // Active, Fulfilled, Cancelled
    createdAt: '2026-09-23 16:30',
    assignedDonorId: null
  },
  {
    id: 'REQ-802',
    patientName: 'Rohan Patil',
    hospitalName: 'Palghar District Civil Hospital',
    hospitalCity: 'Palghar',
    bloodGroup: 'O+',
    unitsNeeded: 3,
    unitsFulfilled: 1,
    urgency: 'Emergency',
    contactPhone: '+91 2525 254222',
    notes: 'Road traffic accident trauma victim. Critical requirement.',
    status: 'Active',
    createdAt: '2026-09-23 17:15',
    assignedDonorId: 'D-253135'
  },
  {
    id: 'REQ-800',
    patientName: 'Anjali Sharma',
    hospitalName: 'Thunga Hospital',
    hospitalCity: 'Boisar',
    bloodGroup: 'B+',
    unitsNeeded: 1,
    unitsFulfilled: 1,
    urgency: 'Standard',
    contactPhone: '+91 2525 251999',
    notes: 'Scheduled elective surgery. Completed successfully.',
    status: 'Fulfilled',
    createdAt: '2026-09-22 10:00',
    assignedDonorId: 'D-253130'
  }
];

const initialRewards = [
  {
    id: 'REW-101',
    title: 'Café Voucher',
    partner: 'Café Coffee Day / Local Brews Boisar',
    points: 100,
    category: 'Food & Beverage',
    icon: 'fa-mug-hot',
    description: 'Flat Rs. 150 off on beverages or snacks at partner cafés.',
    sponsor: 'Boisar Food Court Partners'
  },
  {
    id: 'REW-102',
    title: 'Movie Discount Ticket',
    partner: 'PVR Cinemas / K-Bioscope Palghar',
    points: 300,
    category: 'Entertainment',
    icon: 'fa-film',
    description: '50% discount on 2 movie tickets on any weekday screening.',
    sponsor: 'Entertainment Guild'
  },
  {
    id: 'REW-103',
    title: 'Gym Day Pass / Membership Off',
    partner: 'Cult.Fit / Gold’s Gym Boisar',
    points: 300,
    category: 'Fitness',
    icon: 'fa-dumbbell',
    description: '1-Week unlimited gym access + 25% discount on quarterly plan.',
    sponsor: 'Palghar Health & Fitness Club'
  },
  {
    id: 'REW-104',
    title: 'Free Health Check-Up Camp',
    partner: 'Sanjivani Diagnostics & Wellness',
    points: 750,
    category: 'Healthcare',
    icon: 'fa-heart-pulse',
    description: 'Complete CBC, Blood Sugar, Lipid Profile & Doctor Consultation.',
    sponsor: 'Rotary Club of Boisar & Palghar'
  },
  {
    id: 'REW-105',
    title: 'Official Life Saver T-Shirt',
    partner: 'HemoLink Merchandise',
    points: 500,
    category: 'Merchandise',
    icon: 'fa-shirt',
    description: 'Premium cotton donor jersey with custom embroidered blood group.',
    sponsor: 'Theem College IT Project Fund'
  }
];

const initialCollegeChallenge = {
  collegeA: {
    name: 'Theem College of Engineering, Boisar',
    code: 'THEEM',
    registeredDonors: 142,
    successfulDonations: 89,
    emergencyResponses: 34,
    score: 8900
  },
  collegeB: {
    name: 'Vartak College / St. John College',
    code: 'COLLEGE-B',
    registeredDonors: 118,
    successfulDonations: 71,
    emergencyResponses: 25,
    score: 7150
  }
};

class HemoLinkStore {
  constructor() {
    this.init();
  }

  init() {
    if (!localStorage.getItem(STORAGE_KEYS.DONORS)) {
      localStorage.setItem(STORAGE_KEYS.DONORS, JSON.stringify(initialDonors));
    }
    if (!localStorage.getItem(STORAGE_KEYS.REQUESTS)) {
      localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(initialRequests));
    }
    if (!localStorage.getItem(STORAGE_KEYS.REWARDS)) {
      localStorage.setItem(STORAGE_KEYS.REWARDS, JSON.stringify(initialRewards));
    }
    if (!localStorage.getItem(STORAGE_KEYS.REDEMPTIONS)) {
      localStorage.setItem(STORAGE_KEYS.REDEMPTIONS, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.COLLEGE_CHALLENGE)) {
      localStorage.setItem(STORAGE_KEYS.COLLEGE_CHALLENGE, JSON.stringify(initialCollegeChallenge));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CURRENT_ROLE)) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_ROLE, 'public'); // 'public', 'hospital', 'admin', 'donor'
    }
    if (!localStorage.getItem(STORAGE_KEYS.CURRENT_USER)) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(initialDonors[0]));
    }
  }

  // Role Management
  getRole() {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_ROLE) || 'public';
  }

  setRole(role) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_ROLE, role);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER));
  }

  setCurrentUser(user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  }

  // Donors
  getDonors() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.DONORS)) || [];
  }

  getVerifiedDonors() {
    return this.getDonors().filter(d => d.status === 'Verified');
  }

  getPendingDonors() {
    return this.getDonors().filter(d => d.status === 'Pending');
  }

  addDonor(donorData) {
    const donors = this.getDonors();
    const newId = 'D-' + Math.floor(100000 + Math.random() * 900000);
    const donor = {
      id: newId,
      name: donorData.name,
      rollNo: donorData.rollNo || 'N/A',
      college: donorData.college || 'Theem College of Engineering, Boisar',
      bloodGroup: donorData.bloodGroup,
      phone: donorData.phone,
      city: donorData.city || 'Boisar',
      area: donorData.area || 'Boisar',
      status: 'Pending', // New donors require Admin verification!
      availability: 'Available',
      trustScore: 70, // Base trust score
      hemoPoints: 50, // Welcome points
      totalDonations: 0,
      emergencyDonations: 0,
      rareGroupDonations: 0,
      livesSaved: 0,
      tier: 'Bronze Life Saver',
      donationsToNextTier: 2,
      lastDonationDate: 'Never',
      invitedCount: 0,
      registeredReferrals: 0,
      verifiedReferrals: 0,
      history: [
        { date: new Date().toISOString().split('T')[0], type: 'Welcome Bonus', hospital: 'Account Created', units: 0, pointsEarned: 50 }
      ]
    };

    // If referral code used, credit inviter
    if (donorData.referralCode) {
      const inviter = donors.find(d => d.id === donorData.referralCode);
      if (inviter) {
        inviter.registeredReferrals = (inviter.registeredReferrals || 0) + 1;
      }
    }

    donors.unshift(donor);
    localStorage.setItem(STORAGE_KEYS.DONORS, JSON.stringify(donors));

    // Update college challenge
    const challenge = this.getCollegeChallenge();
    challenge.collegeA.registeredDonors += 1;
    localStorage.setItem(STORAGE_KEYS.COLLEGE_CHALLENGE, JSON.stringify(challenge));

    return donor;
  }

  verifyDonor(donorId, approve = true) {
    const donors = this.getDonors();
    const donor = donors.find(d => d.id === donorId);
    if (!donor) return null;

    if (approve) {
      donor.status = 'Verified';
      donor.trustScore = Math.min(100, donor.trustScore + 20); // Verification boost
      donor.history.push({
        date: new Date().toISOString().split('T')[0],
        type: 'Admin Verification',
        hospital: 'HemoLink HQ',
        units: 0,
        pointsEarned: 25
      });
      donor.hemoPoints += 25;
    } else {
      donor.status = 'Rejected';
    }

    localStorage.setItem(STORAGE_KEYS.DONORS, JSON.stringify(donors));

    // Check if current user is this donor
    const cur = this.getCurrentUser();
    if (cur && cur.id === donorId) {
      this.setCurrentUser(donor);
    }
    return donor;
  }

  // Requests
  getRequests() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.REQUESTS)) || [];
  }

  getActiveRequests() {
    return this.getRequests().filter(r => r.status === 'Active');
  }

  addRequest(reqData) {
    const requests = this.getRequests();
    const newId = 'REQ-' + Math.floor(100 + Math.random() * 900);
    const newReq = {
      id: newId,
      patientName: reqData.patientName,
      hospitalName: reqData.hospitalName,
      hospitalCity: reqData.hospitalCity || 'Boisar',
      bloodGroup: reqData.bloodGroup,
      unitsNeeded: parseInt(reqData.unitsNeeded) || 1,
      unitsFulfilled: 0,
      urgency: reqData.urgency || 'Emergency',
      contactPhone: reqData.contactPhone,
      notes: reqData.notes || 'Emergency request posted.',
      status: 'Active',
      createdAt: new Date().toLocaleString(),
      assignedDonorId: null
    };

    requests.unshift(newReq);
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(requests));
    return newReq;
  }

  fulfillRequest(requestId, donorId) {
    const requests = this.getRequests();
    const req = requests.find(r => r.id === requestId);
    if (!req) return null;

    req.status = 'Fulfilled';
    req.unitsFulfilled = req.unitsNeeded;
    req.assignedDonorId = donorId;
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(requests));

    // Calculate points according to project rules:
    // Normal: 100, Emergency: 150, Rare Blood Group: 200
    let points = 100;
    if (req.urgency === 'Rare Blood Group' || ['AB-', 'O-', 'B-'].includes(req.bloodGroup)) {
      points = 200;
    } else if (req.urgency === 'Emergency') {
      points = 150;
    }

    // Award points to donor if assigned
    if (donorId) {
      const donors = this.getDonors();
      const donor = donors.find(d => d.id === donorId);
      if (donor) {
        donor.hemoPoints += points;
        donor.totalDonations += 1;
        donor.livesSaved += req.unitsNeeded * 3;
        donor.lastDonationDate = new Date().toISOString().split('T')[0];
        donor.availability = 'On Cooldown';

        if (points === 200) donor.rareGroupDonations += 1;
        if (points === 150) donor.emergencyDonations += 1;

        // Upgrade tier
        if (donor.totalDonations >= 5) {
          donor.tier = 'Platinum Hero';
          donor.donationsToNextTier = 0;
        } else if (donor.totalDonations >= 3) {
          donor.tier = 'Gold Life Saver';
          donor.donationsToNextTier = 5 - donor.totalDonations;
        } else if (donor.totalDonations >= 1) {
          donor.tier = 'Silver Life Saver';
          donor.donationsToNextTier = 3 - donor.totalDonations;
        }

        // Trust score boost for successful emergency donation
        donor.trustScore = Math.min(100, donor.trustScore + 5);

        donor.history.unshift({
          date: new Date().toISOString().split('T')[0],
          type: req.urgency,
          hospital: req.hospitalName,
          units: req.unitsNeeded,
          pointsEarned: points
        });

        localStorage.setItem(STORAGE_KEYS.DONORS, JSON.stringify(donors));

        const cur = this.getCurrentUser();
        if (cur && cur.id === donorId) {
          this.setCurrentUser(donor);
        }
      }
    }

    // Update challenge stats
    const challenge = this.getCollegeChallenge();
    challenge.collegeA.successfulDonations += 1;
    if (req.urgency === 'Emergency' || req.urgency === 'Rare Blood Group') {
      challenge.collegeA.emergencyResponses += 1;
    }
    challenge.collegeA.score += points * 10;
    localStorage.setItem(STORAGE_KEYS.COLLEGE_CHALLENGE, JSON.stringify(challenge));

    return { req, pointsAwarded: points };
  }

  // Rewards
  getRewards() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.REWARDS)) || [];
  }

  getRedemptions() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.REDEMPTIONS)) || [];
  }

  redeemReward(donorId, rewardId) {
    const rewards = this.getRewards();
    const reward = rewards.find(r => r.id === rewardId);
    if (!reward) throw new Error('Reward not found');

    const donors = this.getDonors();
    const donor = donors.find(d => d.id === donorId);
    if (!donor) throw new Error('Donor not found');

    if (donor.hemoPoints < reward.points) {
      throw new Error(`Insufficient HemoPoints. You need ${reward.points} points.`);
    }

    donor.hemoPoints -= reward.points;
    donor.history.unshift({
      date: new Date().toISOString().split('T')[0],
      type: 'Reward Redemption',
      hospital: reward.title + ' (' + reward.partner + ')',
      units: 0,
      pointsEarned: -reward.points
    });

    const voucherCode = 'HEMO-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    const redemption = {
      id: 'RED-' + Date.now(),
      donorId: donor.id,
      donorName: donor.name,
      rewardId: reward.id,
      rewardTitle: reward.title,
      partner: reward.partner,
      voucherCode: voucherCode,
      redeemedAt: new Date().toLocaleString()
    };

    const redemptions = this.getRedemptions();
    redemptions.unshift(redemption);

    localStorage.setItem(STORAGE_KEYS.DONORS, JSON.stringify(donors));
    localStorage.setItem(STORAGE_KEYS.REDEMPTIONS, JSON.stringify(redemptions));

    const cur = this.getCurrentUser();
    if (cur && cur.id === donorId) {
      this.setCurrentUser(donor);
    }

    return redemption;
  }

  getCollegeChallenge() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.COLLEGE_CHALLENGE));
  }
}

// Global instance
window.HemoStore = new HemoLinkStore();

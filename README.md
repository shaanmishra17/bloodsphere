# BloodSphere.io - Digital Blood Donation and Emergency Response Platform

**Department of Information Technology Engineering**  
**H. J. Thim Trust's Theem College of Engineering, Boisar (E), Palghar**  
*S.E. Semester-III Mini Project*

---

## 👥 Project Team
- **Tanmay Ramesh Parandwal** (Roll No: 253135)
- **Shaan Dharmendra Mishra** (Roll No: 253130)
- **Shubham Dibakar Pradhan** (Roll No: 253144)
- **Sumit Omprakash Pathak** (Roll No: 253137)  
*Guide: Faculty, Department of Information Technology Engineering*

---

## 🎯 Motivation & Problem Statement
1. **Manual Inefficiencies**: Many hospitals and emergency wards still rely on manual registers or disjointed phone calls to find compatible blood donors.
2. **Delayed Response Times**: Unavailability of blood at the required time leads to an estimated **12,000 preventable deaths every 24 hours** in India.
3. **Unverified Records**: Outdated or unverified donor phone lists result in wasted critical minutes during trauma and surgery emergencies.
4. **Donor Retention**: Traditional systems lack non-monetary incentives to sustain voluntary donor participation.

---

## 🌟 Key Features Implemented

### 1. 🛡️ Role-Based Access Control (RBAC) & Dedicated Terminals
- **Public / Seeker**: Instant SOS emergency broadcast ticker, live Leaflet map of Boisar/Palghar hospitals, interactive blood compatibility calculator, and College Challenge leaderboard.
- **Hospital Portal**: Search **verified donors only**, filter by blood type and Trust Score, broadcast emergency blood requests, and record successful donations.
- **Admin Console**: Super-admin governance, system metrics, and the **Pending Donor Verification Queue** (Slide 7 core requirement).
- **Donor Hub**: Digital Impact Card, SpherePoints wallet, rewards store, referral tree, and printable Life Saver Certificate.

### 2. 🪙 "Donate & Earn" - Non-Monetary SpherePoints Economy
- Donors earn SpherePoints based on urgency:
  - Standard Voluntary Donation: **+100 SpherePoints**
  - Emergency SOS Donation: **+150 SpherePoints**
  - Rare Blood Group Emergency (AB-, O-, etc.): **+200 SpherePoints**
  - Friend Referral (once verified): **+50 SpherePoints**
- Redeemable for real perks sponsored by local partner businesses:
  - ☕ Café Coffee Day / Local Brews Voucher (100 pts)
  - 🎬 PVR Cinemas / Movie Discount Ticket (300 pts)
  - 🏋️ Cult.fit / Gym Day Pass (300 pts)
  - 🩺 Free Comprehensive Health Check-Up Camp (750 pts)
  - 👕 Official BloodSphere.io Life Saver T-Shirt (500 pts)

### 3. ⭐ Donor Trust Score Algorithm (0 – 100%)
Multi-factor scoring to help hospitals prioritize reliable donors during emergencies:
- **Admin Verification**: +30%
- **Past Successful Donations**: +30% (up to 30 pts)
- **Emergency Readiness / Response Rate**: +25%
- **Profile Completeness & College Verification**: +15%

### 4. 🪪 Digital Impact Card & Tier Progression
- Holographic medical card with donor blood group, ID, and live availability toggle (`Available` / `On Cooldown`).
- Tier hierarchy: **Bronze Life Saver** ➔ **Silver Life Saver** ➔ **Gold Life Saver** ➔ **Platinum Hero**.

### 5. ⚔️ College Blood Challenge
- Inter-college derby tracker: **Theem College of Engineering, Boisar** vs **Challenger Colleges**.
- Tracks registered donors, successful units donated, and emergency response lead margins.

### 6. 📜 Official Life Saver Digital Certificate
- Generates an authentic, printable Certificate of Appreciation with donor name, roll number, blood group, date, and Theem College IT Department verification seal.

---

## 🚀 How to Run the Platform

1. **Direct Browser Execution**:
   - Double-click or open `index.html` in any modern web browser (Google Chrome, Microsoft Edge, Firefox, Brave).
   - Zero installation or complex dependencies required — all assets and libraries (Bootstrap 5, FontAwesome, Leaflet, Confetti) are loaded seamlessly via CDN.
   - All actions (registration, verification, request creation, donation fulfillment, reward redemption) persist locally in your browser's `localStorage`.

2. **Testing Role Flows**:
   - Use the **Role Switcher** at the top of the navbar:
     - Click **Hospital Portal** to post an emergency request or search verified donors in Boisar.
     - Click **Admin Console** to inspect the pending verification queue and approve new donors.
     - Click **Donor Hub** to view the Impact Card, redeem café/movie rewards, view the referral tree, or generate the certificate.

---

## 🗄️ Database Architecture (MySQL)

The complete SQL relational database schema is provided in:
`database/schema.sql`

Includes:
- `users` (Authentication & Role mapping)
- `donors` (Medical status, trust score, points balance, tier)
- `hospitals` (License numbers, emergency coordinates, contacts)
- `blood_requests` (Urgency level, units required, status)
- `donations` (Fulfilled logs, point ledger)
- `rewards_catalog` & `reward_redemptions` (Sponsors, voucher codes)
- `donor_referrals` (Referral network tree tracking)

---

## 🎓 Viva & Presentation Preparation Notes

- **Q: Why are unverified donors hidden from hospitals?**  
  *A: To prevent hospitals from wasting critical emergency response time calling unverified, ineligible, or fake numbers. Only Admin-screened donors are listed.*
- **Q: How does the platform avoid illegal paid blood donation?**  
  *A: HemoLink operates strictly under the "Donate & Earn - But NOT Money" model. Points can only be exchanged for non-monetary health, fitness, food, and recognition rewards sponsored by community partners.*
- **Q: How is the Blood Compatibility logic implemented?**  
  *A: The system implements standard ABO and Rh factor agglutination matrices (e.g. O- is the universal red cell donor; AB+ is universal recipient).*

-- ==============================================================================
-- BloodSphere.io - Digital Blood Donation and Emergency Response Platform
-- Database: MySQL 8.0+
-- Department of Information Technology Engineering
-- H. J. Thim Trust's Theem College of Engineering, Boisar
-- S.E. Semester-III Mini Project Database Schema
--
-- Project Team:
-- 1. Tanmay Ramesh Parandwal (253135)
-- 2. Shaan Dharmendra Mishra (253130)
-- 3. Shubham Dibakar Pradhan (253144)
-- 4. Sumit Omprakash Pathak (253137)
-- ==============================================================================

CREATE DATABASE IF NOT EXISTS bloodsphere_db;
USE bloodsphere_db;

-- 1. Roles Table
CREATE TABLE IF NOT EXISTS roles (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO roles (role_name) VALUES 
('ROLE_ADMIN'),
('ROLE_HOSPITAL'),
('ROLE_DONOR');

-- 2. Users Table (Authentication & Access Control)
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(120) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(role_id) ON DELETE RESTRICT
);

-- 3. Donors Table
CREATE TABLE IF NOT EXISTS donors (
    donor_id VARCHAR(20) PRIMARY KEY,
    user_id INT UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    roll_no VARCHAR(20),
    college_name VARCHAR(150) DEFAULT 'Theem College of Engineering, Boisar',
    blood_group ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-') NOT NULL,
    phone VARCHAR(20) NOT NULL,
    city VARCHAR(50) DEFAULT 'Boisar',
    area VARCHAR(100),
    status ENUM('Pending', 'Verified', 'Rejected') DEFAULT 'Pending',
    availability ENUM('Available', 'On Cooldown', 'Unavailable') DEFAULT 'Available',
    trust_score INT DEFAULT 70,
    hemo_points INT DEFAULT 50,
    total_donations INT DEFAULT 0,
    lives_saved INT DEFAULT 0,
    tier ENUM('Bronze Life Saver', 'Silver Life Saver', 'Gold Life Saver', 'Platinum Hero') DEFAULT 'Bronze Life Saver',
    last_donation_date DATE NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL
);

-- 4. Hospitals / Blood Banks Table
CREATE TABLE IF NOT EXISTS hospitals (
    hospital_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNIQUE,
    hospital_name VARCHAR(150) NOT NULL,
    license_no VARCHAR(50) NOT NULL UNIQUE,
    city VARCHAR(50) NOT NULL,
    address TEXT,
    emergency_contact VARCHAR(20) NOT NULL,
    is_verified BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL
);

-- 5. Emergency Blood Requests Table
CREATE TABLE IF NOT EXISTS blood_requests (
    request_id VARCHAR(20) PRIMARY KEY,
    hospital_id INT NOT NULL,
    patient_name VARCHAR(100) NOT NULL,
    blood_group ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-') NOT NULL,
    units_needed INT NOT NULL DEFAULT 1,
    units_fulfilled INT NOT NULL DEFAULT 0,
    urgency ENUM('Standard', 'Emergency', 'Rare Blood Group') DEFAULT 'Emergency',
    contact_phone VARCHAR(20) NOT NULL,
    notes TEXT,
    status ENUM('Active', 'Fulfilled', 'Cancelled') DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (hospital_id) REFERENCES hospitals(hospital_id) ON DELETE CASCADE
);

-- 6. Donations Ledger (Fulfilled Requests & Point Credits)
CREATE TABLE IF NOT EXISTS donations (
    donation_id INT AUTO_INCREMENT PRIMARY KEY,
    request_id VARCHAR(20) NOT NULL,
    donor_id VARCHAR(20) NOT NULL,
    hospital_id INT NOT NULL,
    units_donated INT NOT NULL DEFAULT 1,
    points_awarded INT NOT NULL,
    donation_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (request_id) REFERENCES blood_requests(request_id),
    FOREIGN KEY (donor_id) REFERENCES donors(donor_id),
    FOREIGN KEY (hospital_id) REFERENCES hospitals(hospital_id)
);

-- 7. Rewards Catalog ("Donate & Earn - Not Money")
CREATE TABLE IF NOT EXISTS rewards_catalog (
    reward_id VARCHAR(20) PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    partner_name VARCHAR(100) NOT NULL,
    points_required INT NOT NULL,
    category VARCHAR(50),
    description TEXT,
    sponsor_name VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE
);

-- 8. Reward Redemptions Ledger
CREATE TABLE IF NOT EXISTS reward_redemptions (
    redemption_id VARCHAR(30) PRIMARY KEY,
    donor_id VARCHAR(20) NOT NULL,
    reward_id VARCHAR(20) NOT NULL,
    voucher_code VARCHAR(50) NOT NULL UNIQUE,
    redeemed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (donor_id) REFERENCES donors(donor_id),
    FOREIGN KEY (reward_id) REFERENCES rewards_catalog(reward_id)
);

-- 9. Donor Referrals Table
CREATE TABLE IF NOT EXISTS donor_referrals (
    referral_id INT AUTO_INCREMENT PRIMARY KEY,
    referrer_donor_id VARCHAR(20) NOT NULL,
    referee_donor_id VARCHAR(20) NOT NULL,
    status ENUM('Invited', 'Registered', 'Verified') DEFAULT 'Registered',
    points_credited INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (referrer_donor_id) REFERENCES donors(donor_id),
    FOREIGN KEY (referee_donor_id) REFERENCES donors(donor_id)
);

-- 10. Sample Pre-Seeded Records
INSERT INTO hospitals (hospital_name, license_no, city, address, emergency_contact) VALUES
('Anand Hospital & Critical Care', 'MAH-PAL-2021-089', 'Boisar', 'Near Railway Station, Boisar West', '+91 2525 252111'),
('Thunga Hospital', 'MAH-PAL-2019-102', 'Boisar', 'Tarapur MIDC Road, Boisar', '+91 2525 251999'),
('Palghar District Civil Hospital', 'MAH-PAL-GOV-001', 'Palghar', 'Civil Hospital Compound, Palghar East', '+91 2525 254222');

INSERT INTO rewards_catalog (reward_id, title, partner_name, points_required, category, description, sponsor_name) VALUES
('REW-101', 'Café Voucher', 'Café Coffee Day / Local Brews Boisar', 100, 'Food & Beverage', 'Flat Rs. 150 off on beverages or snacks.', 'Boisar Food Court Partners'),
('REW-102', 'Movie Discount Ticket', 'PVR Cinemas / K-Bioscope Palghar', 300, 'Entertainment', '50% discount on 2 movie tickets on any weekday screening.', 'Entertainment Guild'),
('REW-103', 'Gym Day Pass / Membership Off', 'Cult.Fit / Gold’s Gym Boisar', 300, 'Fitness', '1-Week unlimited gym access + 25% discount on quarterly plan.', 'Palghar Health & Fitness Club'),
('REW-104', 'Free Health Check-Up Camp', 'Sanjivani Diagnostics & Wellness', 750, 'Healthcare', 'Complete CBC, Blood Sugar, Lipid Profile & Doctor Consultation.', 'Rotary Club of Boisar & Palghar'),
('REW-105', 'Official Life Saver T-Shirt', 'HemoLink Merchandise', 500, 'Merchandise', 'Premium cotton donor jersey with custom embroidered blood group.', 'Theem College IT Project Fund');

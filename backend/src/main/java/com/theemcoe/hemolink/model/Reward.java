package com.theemcoe.hemolink.model;

import jakarta.persistence.*;

@Entity
@Table(name = "rewards_catalog")
public class Reward {

    @Id
    @Column(name = "reward_id", length = 20)
    private String id;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(name = "partner_name", nullable = false, length = 100)
    private String partner;

    @Column(name = "points_required", nullable = false)
    private int points;

    @Column(length = 50)
    private String category;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "sponsor_name", length = 100)
    private String sponsor;

    public Reward() {}

    public Reward(String id, String title, String partner, int points, String category, String description, String sponsor) {
        this.id = id;
        this.title = title;
        this.partner = partner;
        this.points = points;
        this.category = category;
        this.description = description;
        this.sponsor = sponsor;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getPartner() { return partner; }
    public void setPartner(String partner) { this.partner = partner; }

    public int getPoints() { return points; }
    public void setPoints(int points) { this.points = points; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getSponsor() { return sponsor; }
    public void setSponsor(String sponsor) { this.sponsor = sponsor; }
}

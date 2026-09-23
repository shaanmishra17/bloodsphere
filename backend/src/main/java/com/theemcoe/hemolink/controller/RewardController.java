package com.theemcoe.hemolink.controller;

import com.theemcoe.hemolink.model.Reward;
import com.theemcoe.hemolink.repository.RewardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rewards")
@CrossOrigin(origins = "*")
public class RewardController {

    @Autowired
    private RewardRepository rewardRepository;

    @GetMapping
    public List<Reward> getAllRewards() {
        return rewardRepository.findAll();
    }
}

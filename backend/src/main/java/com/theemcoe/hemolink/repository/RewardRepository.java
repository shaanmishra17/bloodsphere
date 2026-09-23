package com.theemcoe.hemolink.repository;

import com.theemcoe.hemolink.model.Reward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RewardRepository extends JpaRepository<Reward, String> {
    List<Reward> findByCategory(String category);
}

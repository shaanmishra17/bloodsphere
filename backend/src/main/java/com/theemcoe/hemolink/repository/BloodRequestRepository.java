package com.theemcoe.hemolink.repository;

import com.theemcoe.hemolink.model.BloodRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BloodRequestRepository extends JpaRepository<BloodRequest, String> {
    List<BloodRequest> findByStatus(String status);
    List<BloodRequest> findByBloodGroup(String bloodGroup);
    List<BloodRequest> findByHospitalCity(String hospitalCity);
}

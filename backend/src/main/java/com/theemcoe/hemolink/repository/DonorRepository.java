package com.theemcoe.hemolink.repository;

import com.theemcoe.hemolink.model.Donor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DonorRepository extends JpaRepository<Donor, String> {
    List<Donor> findByStatus(String status);
    List<Donor> findByStatusAndBloodGroup(String status, String bloodGroup);
    List<Donor> findByBloodGroup(String bloodGroup);
    List<Donor> findByCollege(String college);
}

package com.hamediah.repository;

import com.hamediah.domain.Application;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByJobIdOrderByCreatedAtDesc(Long jobId);
    boolean existsByJobIdAndApplicantEmail(Long jobId, String applicantEmail);
}
package com.hamediah.repository;

import com.hamediah.domain.Job;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findTop20ByOrderByCreatedAtDesc();

    // Suche nach Titel ODER Company-Name (beides case-insensitive)
    List<Job> findByTitleContainingIgnoreCaseOrCompany_NameContainingIgnoreCase(String title, String companyName);
}
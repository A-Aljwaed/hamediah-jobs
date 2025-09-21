package com.hamediah.service;

import com.hamediah.domain.Job;
import com.hamediah.repository.JobRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobService {
    private final JobRepository repo;

    public JobService(JobRepository repo) {
        this.repo = repo;
    }

    public List<Job> recent() {
        return repo.findTop20ByOrderByCreatedAtDesc();
    }

    public List<Job> search(String q) {
        if (q == null || q.isBlank()) return recent();
        return repo.findByTitleContainingIgnoreCaseOrCompany_NameContainingIgnoreCase(q, q);
    }

    public Optional<Job> findById(Long id) {
        return repo.findById(id);
    }
}
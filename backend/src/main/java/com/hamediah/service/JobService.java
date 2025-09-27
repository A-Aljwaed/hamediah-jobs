package com.hamediah.service;

import com.hamediah.domain.Job;
import com.hamediah.domain.Company;
import com.hamediah.repository.JobRepository;
import com.hamediah.repository.CompanyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobService {
    private final JobRepository repo;
    private final CompanyRepository companyRepo;

    public JobService(JobRepository repo, CompanyRepository companyRepo) {
        this.repo = repo;
        this.companyRepo = companyRepo;
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

    public Job createJob(String title, String description, String location, String tags, Long companyId) {
        Optional<Company> company = companyRepo.findById(companyId);
        if (company.isEmpty()) {
            throw new RuntimeException("Company not found");
        }

        Job job = new Job();
        job.setTitle(title);
        job.setDescription(description);
        job.setLocation(location);
        job.setTags(tags);
        job.setCompany(company.get());

        return repo.save(job);
    }

    public Job updateJob(Long id, String title, String description, String location, String tags) {
        Optional<Job> existingJob = repo.findById(id);
        if (existingJob.isEmpty()) {
            throw new RuntimeException("Job not found");
        }

        Job job = existingJob.get();
        job.setTitle(title);
        job.setDescription(description);
        job.setLocation(location);
        job.setTags(tags);

        return repo.save(job);
    }

    public void deleteJob(Long id) {
        repo.deleteById(id);
    }
}
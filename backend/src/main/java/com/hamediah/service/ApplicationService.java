package com.hamediah.service;

import com.hamediah.domain.Application;
import com.hamediah.domain.Job;
import com.hamediah.repository.ApplicationRepository;
import com.hamediah.repository.JobRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ApplicationService {
    private final ApplicationRepository applicationRepo;
    private final JobRepository jobRepo;

    public ApplicationService(ApplicationRepository applicationRepo, JobRepository jobRepo) {
        this.applicationRepo = applicationRepo;
        this.jobRepo = jobRepo;
    }

    public Application submitApplication(Long jobId, String applicantName, String applicantEmail, String coverLetter, String resumeUrl) {
        // Check if job exists
        Optional<Job> job = jobRepo.findById(jobId);
        if (job.isEmpty()) {
            throw new RuntimeException("Job not found");
        }

        // Check if user already applied
        if (applicationRepo.existsByJobIdAndApplicantEmail(jobId, applicantEmail)) {
            throw new RuntimeException("You have already applied for this job");
        }

        Application application = new Application();
        application.setJob(job.get());
        application.setApplicantName(applicantName);
        application.setApplicantEmail(applicantEmail);
        application.setCoverLetter(coverLetter);
        application.setResumeUrl(resumeUrl);

        return applicationRepo.save(application);
    }

    public List<Application> getApplicationsForJob(Long jobId) {
        return applicationRepo.findByJobIdOrderByCreatedAtDesc(jobId);
    }

    public boolean hasUserApplied(Long jobId, String applicantEmail) {
        return applicationRepo.existsByJobIdAndApplicantEmail(jobId, applicantEmail);
    }
}
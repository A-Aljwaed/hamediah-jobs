package com.hamediah.api;

import com.hamediah.domain.Application;
import com.hamediah.service.ApplicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/applications")
public class ApplicationApiController {

    private final ApplicationService service;

    public ApplicationApiController(ApplicationService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Application> submitApplication(@RequestBody Map<String, Object> request) {
        try {
            Long jobId = Long.valueOf(request.get("jobId").toString());
            String applicantName = (String) request.get("applicantName");
            String applicantEmail = (String) request.get("applicantEmail");
            String coverLetter = (String) request.get("coverLetter");
            String resumeUrl = (String) request.get("resumeUrl");

            Application application = service.submitApplication(jobId, applicantName, applicantEmail, coverLetter, resumeUrl);
            return ResponseEntity.ok(application);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/job/{jobId}")
    public List<Application> getApplicationsForJob(@PathVariable Long jobId) {
        return service.getApplicationsForJob(jobId);
    }

    @GetMapping("/check")
    public ResponseEntity<Map<String, Boolean>> checkIfApplied(
            @RequestParam Long jobId, 
            @RequestParam String email) {
        boolean hasApplied = service.hasUserApplied(jobId, email);
        return ResponseEntity.ok(Map.of("hasApplied", hasApplied));
    }
}
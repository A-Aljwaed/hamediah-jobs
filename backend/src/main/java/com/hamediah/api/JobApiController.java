package com.hamediah.api;

import com.hamediah.domain.Job;
import com.hamediah.service.JobService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/jobs")
public class JobApiController {

    private final JobService service;

    public JobApiController(JobService service) {
        this.service = service;
    }

    @GetMapping
    public List<Job> list(@RequestParam(value = "q", required = false) String q) {
        return service.search(q);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Job> detail(@PathVariable Long id) {
        var job = service.findById(id);
        return job.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Job> createJob(@RequestBody Map<String, Object> request) {
        try {
            String title = (String) request.get("title");
            String description = (String) request.get("description");
            String location = (String) request.get("location");
            String tags = (String) request.get("tags");
            Long companyId = Long.valueOf(request.get("companyId").toString());

            Job job = service.createJob(title, description, location, tags, companyId);
            return ResponseEntity.ok(job);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Job> updateJob(@PathVariable Long id, @RequestBody Map<String, Object> request) {
        try {
            String title = (String) request.get("title");
            String description = (String) request.get("description");
            String location = (String) request.get("location");
            String tags = (String) request.get("tags");

            Job job = service.updateJob(id, title, description, location, tags);
            return ResponseEntity.ok(job);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable Long id) {
        service.deleteJob(id);
        return ResponseEntity.ok().build();
    }
}
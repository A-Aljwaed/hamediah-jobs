package com.hamediah.api;

import com.hamediah.domain.Job;
import com.hamediah.service.JobService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "http://localhost:3000") // Allow React app to call this API
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
}
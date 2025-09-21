package com.hamediah.web;

import com.hamediah.service.JobService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/jobs")
public class JobController {

    private final JobService service;

    public JobController(JobService service) {
        this.service = service;
    }

    @GetMapping
    public String list(@RequestParam(value = "q", required = false) String q, Model model) {
        model.addAttribute("q", q);
        model.addAttribute("jobs", service.search(q));
        return "jobs/list";
    }

    @GetMapping("/{id}")
    public String detail(@PathVariable Long id, Model model) {
        var job = service.findById(id).orElse(null);
        if (job == null) return "redirect:/jobs";
        model.addAttribute("job", job);
        return "jobs/detail";
    }
}
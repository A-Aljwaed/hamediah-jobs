package com.hamediah.api;

import com.hamediah.domain.Company;
import com.hamediah.repository.CompanyRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/companies")
public class CompanyApiController {

    private final CompanyRepository repository;

    public CompanyApiController(CompanyRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Company> list() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Company> detail(@PathVariable Long id) {
        var company = repository.findById(id);
        return company.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
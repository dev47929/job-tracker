package com.example.jobTracker.Controller;

import com.example.jobTracker.Entity.JobStatus;
import com.example.jobTracker.Repository.JobStatusRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class jobTrackerController {
    @Autowired
    private JobStatusRepo jobstatusrepo;

}

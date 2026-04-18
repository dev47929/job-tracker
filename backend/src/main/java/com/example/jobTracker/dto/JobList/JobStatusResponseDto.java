package com.example.jobTracker.dto.JobList;

import com.example.jobTracker.Entity.JobStatus;
import com.example.jobTracker.Entity.User;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class JobStatusResponseDto {
    private Long jobId;

    private String company;
    private String status;
    private LocalDate appliedOn;
    private String role;
    
}

package com.example.jobTracker.dto.JobList;

import lombok.Data;

import java.time.LocalDate;
@Data
public class PostJobReqDTO {
    private String company;
    private String status;
    private LocalDate appliedOn;
    private String role;
}

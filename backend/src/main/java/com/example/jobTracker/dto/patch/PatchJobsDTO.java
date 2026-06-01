package com.example.jobTracker.dto.patch;

import com.example.jobTracker.Entity.JobStatus;
import lombok.Data;
import lombok.Generated;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Map;
@Getter
@Setter
@Data
public class PatchJobsDTO {
    private Long jobID;
    private String company;
    private String status;
    private String appliedOn;
    private String role;
}

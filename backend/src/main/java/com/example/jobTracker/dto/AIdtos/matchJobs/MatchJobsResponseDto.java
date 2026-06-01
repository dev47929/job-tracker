package com.example.jobTracker.dto.AIdtos.matchJobs;

import lombok.Data;

import java.util.List;

@Data
public class MatchJobsResponseDto {
    private int matchPercentage;
    private String summary;
    private List<String> strengths;
    private List<String> missingSkills;
    private List<String> missingRequirements;
    private List<String> relevantSkills;
    private List<String> relevantProjects;
    private List<String> recommendations;
}

package com.example.jobTracker.Controller;

import com.example.jobTracker.Service.userControl.DashboardService;
import com.example.jobTracker.dto.AIdtos.Message;
import com.example.jobTracker.dto.AIdtos.matchJobs.MatchJobsResponseDto;
import com.example.jobTracker.dto.JobList.JobStatusResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class FileUpload {
    private final DashboardService dashboardService;

    @PostMapping("/users/ai/matchjobs")
    public ResponseEntity<MatchJobsResponseDto> matchJobs(@RequestPart("file") MultipartFile multipartFile, HttpServletRequest httpServletRequest ,  @RequestPart("message")String message){
        if (multipartFile.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        if(multipartFile.getSize() > 5242880) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        return ResponseEntity.ok(dashboardService.matchJobsWithProfile(multipartFile , message , httpServletRequest));

    }
}

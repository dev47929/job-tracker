package com.example.jobTracker.Controller;


import com.example.jobTracker.Service.userControl.DashboardService;
import com.example.jobTracker.dto.JobList.*;
import com.example.jobTracker.dto.User.UserResponseDTO;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RequiredArgsConstructor
@RestController
@RequestMapping("/jobs")
public class UserDashboardController {

    private final DashboardService dashboardService;


    @GetMapping("/users/getdetails")
    public ResponseEntity<UserResponseDTO> getUserJobs(HttpServletRequest httpServletRequest) {
        return ResponseEntity.ok(dashboardService.getUserDetails(httpServletRequest));
    }
    @GetMapping("/users/getjobs")
    public ResponseEntity<List<JobStatusResponseDto>> postJob(HttpServletRequest httpServletRequest) {
        return ResponseEntity.ok(dashboardService.getUsersJobs(httpServletRequest));
    }

    @PostMapping("/users/addjob")
    public ResponseEntity<PostJobResponseDTO> postJob(@RequestBody PostJobReqDTO postJobReqDTO , HttpServletRequest httpServletRequest) {
        return ResponseEntity.ok(dashboardService.addJob(postJobReqDTO , httpServletRequest));
    }

    @DeleteMapping("/users/deljob/{jobId}")
    public ResponseEntity<DelJobResDTO> delJob(@RequestParam Long jobId, HttpServletRequest httpServletRequest){
        return ResponseEntity.ok(dashboardService.delUserJob(jobId , httpServletRequest));
    }
}

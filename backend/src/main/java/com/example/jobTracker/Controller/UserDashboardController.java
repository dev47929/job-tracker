package com.example.jobTracker.Controller;


import com.example.jobTracker.Service.userControl.DashboardService;
import com.example.jobTracker.dto.AiReqDto;
import com.example.jobTracker.dto.AiResDTO;
import com.example.jobTracker.dto.JobList.*;
import com.example.jobTracker.dto.User.UserResponseDTO;
import com.example.jobTracker.dto.patch.PatchJobsDTO;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @PatchMapping
    public ResponseEntity<String> updateJobs(@RequestBody PatchJobsDTO patchJobsDTO , HttpServletRequest httpServletRequest){
        return ResponseEntity.ok(dashboardService.patchJobs(patchJobsDTO, httpServletRequest));
    }

    @DeleteMapping("/users/{jobId}")
    public ResponseEntity<DelJobResDTO> delJob(@PathVariable Long jobId, HttpServletRequest httpServletRequest){
        return ResponseEntity.ok(dashboardService.delUserJob(jobId , httpServletRequest));
    }

    @PostMapping("/users/ai/organizeandadd")
    public ResponseEntity<List<JobStatusResponseDto>> addUsingAi(@RequestBody AiReqDto aiReqDto , HttpServletRequest httpServletRequest){
        return ResponseEntity.ok(dashboardService.askAiAndUpdate(aiReqDto,httpServletRequest));
    }
    @PostMapping("/users/ai/addGroq")
    public ResponseEntity<List<JobStatusResponseDto>> addUsingGroq(@RequestBody AiReqDto aiReqDto , HttpServletRequest httpServletRequest){
        return ResponseEntity.ok(dashboardService.askAiAndUpdateUsingGroq(aiReqDto,httpServletRequest));
    }
}

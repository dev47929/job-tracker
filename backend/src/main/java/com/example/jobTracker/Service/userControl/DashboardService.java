package com.example.jobTracker.Service.userControl;

import com.example.jobTracker.Entity.JobStatus;
import com.example.jobTracker.Entity.User;
import com.example.jobTracker.Repository.JobStatusRepo;
import com.example.jobTracker.Repository.UserRepo;
import com.example.jobTracker.Security.AuthUtil;
import com.example.jobTracker.dto.JobList.*;
import com.example.jobTracker.dto.User.UserResponseDTO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.Nullable;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {
    private final UserRepo userRepo;
    private final JobStatusRepo jobStatusRepo;
    private final AuthUtil authUtil;
    private final ModelMapper modelMapper;

    public List<JobStatusResponseDto> getUsersJobs(HttpServletRequest httpServletRequest) {
        User user = getUser(httpServletRequest);
        return user.getJobStatuses().stream().map(jobStatus -> modelMapper.map(jobStatus , JobStatusResponseDto.class)).toList();
    };

    public PostJobResponseDTO addJob(PostJobReqDTO postJobReqDTO, HttpServletRequest httpServletRequest){
        User user = getUser(httpServletRequest);
        List<JobStatus> jobStatusList = user.getJobStatuses();
            JobStatus jobStatus = modelMapper.map(postJobReqDTO,JobStatus.class);
            jobStatus.setUser(user);
        jobStatusList.add(jobStatus);
        user.setJobStatuses(jobStatusList);
        userRepo.save(user);
        jobStatusRepo.save(jobStatus);
        return modelMapper.map(postJobReqDTO , PostJobResponseDTO.class);
    }

    private User getUser(HttpServletRequest httpServletRequest){
        String token  = httpServletRequest.getHeader("Authorization").split(" ")[1];
        String  username = authUtil.getUsernameFromToken(token);
        System.out.println(username + token);
        if(!userRepo.existsByUsername(username)){
            throw new UsernameNotFoundException("Username not found" +username);
        };

        User user = userRepo.findByUsername(username).orElseThrow();
        return user;
    }

    public UserResponseDTO getUserDetails(HttpServletRequest httpServletRequest) {
        User user = getUser(httpServletRequest);
        UserResponseDTO userResponseDTO = modelMapper.map(user , UserResponseDTO.class);
        System.out.println("User" + user);
        return userResponseDTO;
    };

    public @Nullable DelJobResDTO delUserJob(Long jobId) {
        jobStatusRepo.deleteById(jobId);
        return new DelJobResDTO(true);
    }

}

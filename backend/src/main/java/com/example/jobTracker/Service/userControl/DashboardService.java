package com.example.jobTracker.Service.userControl;

import com.example.jobTracker.Entity.JobStatus;
import com.example.jobTracker.Entity.User;
import com.example.jobTracker.Repository.JobStatusRepo;
import com.example.jobTracker.Repository.UserRepo;
import com.example.jobTracker.Security.AuthUtil;
import com.example.jobTracker.Service.AIapiService;
import com.example.jobTracker.dto.AIdtos.Message;
import com.example.jobTracker.dto.AIdtos.matchJobs.MatchJobsResponseDto;
import com.example.jobTracker.dto.AiReqDto;
import com.example.jobTracker.dto.JobList.*;
import com.example.jobTracker.dto.User.UserResponseDTO;
import com.example.jobTracker.dto.patch.PatchJobsDTO;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {
    private final UserRepo userRepo;
    private final JobStatusRepo jobStatusRepo;
    private final AuthUtil authUtil;
    private final AIapiService aIapiService;
    private final ModelMapper modelMapper;
    @Value("${API_KEY}")
    private String api_key;


    private User authenticateUser(HttpServletRequest httpServletRequest){
        String token  = httpServletRequest.getHeader("Authorization").split(" ")[1];
        String  username = authUtil.getUsernameFromToken(token);
        System.out.println(username + token);
        if(!userRepo.existsByUsername(username)){
            throw new UsernameNotFoundException("Username not found" +username);
        };
        User user = userRepo.findByUsername(username).orElseThrow();
        return user;
    }

    public List<JobStatusResponseDto> getUsersJobs(HttpServletRequest httpServletRequest) {
        User user = authenticateUser(httpServletRequest);
        return user.getJobStatuses().stream().map(jobStatus -> modelMapper.map(jobStatus , JobStatusResponseDto.class)).toList();
    };

    public PostJobResponseDTO addJob(PostJobReqDTO postJobReqDTO, HttpServletRequest httpServletRequest){
        User user = authenticateUser(httpServletRequest);
        List<JobStatus> jobStatusList = user.getJobStatuses();
            JobStatus jobStatus = modelMapper.map(postJobReqDTO,JobStatus.class);
            jobStatus.setUser(user);
        jobStatusList.add(jobStatus);
        user.setJobStatuses(jobStatusList);
        userRepo.save(user);
        jobStatusRepo.save(jobStatus);
        return modelMapper.map(postJobReqDTO , PostJobResponseDTO.class);
    }

    public UserResponseDTO getUserDetails(HttpServletRequest httpServletRequest) {
        User user = authenticateUser(httpServletRequest);
        UserResponseDTO userResponseDTO = modelMapper.map(user , UserResponseDTO.class);
        System.out.println("User" + user);
        return userResponseDTO;
    };

    public DelJobResDTO delUserJob(Long jobId, HttpServletRequest httpServletRequest) {
        jobStatusRepo.deleteById(jobId);
        return new DelJobResDTO(true);
    }


    public List<JobStatusResponseDto> askAiAndUpdate(AiReqDto aiReqDto, HttpServletRequest httpServletRequest) {
        User user = authenticateUser(httpServletRequest);
        List<JobStatus> jobStatusesList = aIapiService.getOpenRouterResponse(aiReqDto.getPrompt());
        List<JobStatusResponseDto> jobStatusResponseDtos = jobStatusesList.stream().map(jobStatus -> modelMapper.map(jobStatus , JobStatusResponseDto.class)).toList();
        return jobStatusResponseDtos;
    }

    public List<JobStatusResponseDto> askAiAndUpdateUsingGroq(AiReqDto aiReqDto, HttpServletRequest httpServletRequest) {
        User user = authenticateUser(httpServletRequest);
        List<JobStatus> jobStatusesList = aIapiService.getGroqApiResponse(aiReqDto.getPrompt());
        List<JobStatusResponseDto> jobStatusResponseDtos = jobStatusesList.stream().map(jobStatus -> modelMapper.map(jobStatus , JobStatusResponseDto.class)).toList();
        return jobStatusResponseDtos;
    }

    public String patchJobs(PatchJobsDTO patchJobsDTO, HttpServletRequest httpServletRequest) {
        User user = authenticateUser(httpServletRequest);

        JobStatus jobStatus = jobStatusRepo.findById(patchJobsDTO.getJobID()).orElseThrow(() -> new RuntimeException("Job id is invalid"));

        if (patchJobsDTO.getStatus() != null) {
            jobStatus.setStatus(patchJobsDTO.getStatus());
        }

        if (patchJobsDTO.getCompany() != null) {
            jobStatus.setCompany(patchJobsDTO.getCompany());
        }

        if (patchJobsDTO.getRole() != null) {
            jobStatus.setRole(patchJobsDTO.getRole());
        }

        if(patchJobsDTO.getAppliedOn() != null) {
            jobStatus.setAppliedOn(patchJobsDTO.getAppliedOn());
        }
        jobStatusRepo.save(jobStatus);
        return "SUCCESS";
    }

    public MatchJobsResponseDto matchJobsWithProfile(MultipartFile multipartFile, String message, HttpServletRequest httpServletRequest) {
        User user = authenticateUser(httpServletRequest);
        String Context;
        try {
            Context = "Resume : " +
                    extractPdfText(multipartFile) + "Job Description : " + message  ;

            ;
        }catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
        return aIapiService.matchJob(Context);
    }

    public String extractPdfText(MultipartFile file) throws IOException {
        try (PDDocument document = Loader.loadPDF(file.getBytes()) ) {
            PDFTextStripper stripper = new PDFTextStripper();
            return stripper.getText(document);
        }
    }
}

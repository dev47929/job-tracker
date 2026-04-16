package com.example.jobTracker.dto.User;

import com.example.jobTracker.Entity.JobStatus;
import lombok.Data;

import java.util.List;

@Data
public class UserResponseDTO {
    private String username;
    private String firstName;
    private String lastName;
    private String email;
}

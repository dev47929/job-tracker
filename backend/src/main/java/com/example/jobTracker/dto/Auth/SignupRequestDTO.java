package com.example.jobTracker.dto.Auth;
import lombok.Data;

@Data
public class SignupRequestDTO {

    private String username;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
}

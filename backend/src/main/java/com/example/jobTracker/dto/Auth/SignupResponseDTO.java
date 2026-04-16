package com.example.jobTracker.dto.Auth;

import lombok.Data;

@Data
public class SignupResponseDTO {
    public String username;
    public String email;

    public SignupResponseDTO(String username, String email) {
        this.username = username;
        this.email = email;
    }
}

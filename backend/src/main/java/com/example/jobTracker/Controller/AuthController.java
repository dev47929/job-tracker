package com.example.jobTracker.Controller;

import com.example.jobTracker.Repository.UserRepo;
import com.example.jobTracker.Service.AuthService;
import com.example.jobTracker.dto.Auth.LoginRequestDTO;
import com.example.jobTracker.dto.Auth.LoginResponseDTO;
import com.example.jobTracker.dto.Auth.SignupRequestDTO;
import com.example.jobTracker.dto.Auth.SignupResponseDTO;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final UserRepo userRepo;
    private final AuthService authService;
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> loginReq(@RequestBody LoginRequestDTO loginRequestDTO , HttpServletResponse httpServletResponse){
        return ResponseEntity.ok(authService.login(loginRequestDTO , httpServletResponse));
    }

    @PostMapping("/signup")
    public ResponseEntity<SignupResponseDTO> signupReq(@RequestBody SignupRequestDTO signupRequestDTO){
        return ResponseEntity.ok(authService.signup(signupRequestDTO));
    }
}

package com.example.jobTracker.Service;

import com.example.jobTracker.Entity.User;
import com.example.jobTracker.Repository.UserRepo;
import com.example.jobTracker.Security.AuthUtil;
import com.example.jobTracker.dto.Auth.LoginRequestDTO;
import com.example.jobTracker.dto.Auth.LoginResponseDTO;
import com.example.jobTracker.dto.Auth.SignupRequestDTO;
import com.example.jobTracker.dto.Auth.SignupResponseDTO;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.extern.slf4j.XSlf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
@Slf4j
public class AuthService {

    @Autowired
    private final AuthenticationManager authenticationManager;
    private final AuthUtil authUtil;
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;



    public LoginResponseDTO login(LoginRequestDTO loginRequestDTO , HttpServletResponse response) {
        System.out.println("Request recieved");
        User newUser;
        try {
            Authentication authenticationUser = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequestDTO.getUsername(),
                            loginRequestDTO.getPassword()
                    )
            );
            newUser = (User) authenticationUser.getPrincipal();
        } catch (Exception e) {
            throw new RuntimeException("Invalid username or password");
        }
        ;

        System.out.println("User Found");
        String Token = authUtil.generatejjwtToken(newUser);
        ResponseCookie responseCookie = ResponseCookie.from("token", Token)
                .path("/")
                .maxAge(24 * 60 * 60)
                .sameSite("Strict")
                .build();
        LoginResponseDTO loginResponseDTO = new LoginResponseDTO(Token, newUser.getUserId());
        response.addHeader("Set-Cookie", responseCookie.toString());
        System.out.println("User authenticated successfully");

        return loginResponseDTO;
    }


    public SignupResponseDTO signup(SignupRequestDTO signupRequestDTO) {

        if(userRepo.findByUsername(signupRequestDTO.getUsername()).isPresent()){
            throw new IllegalArgumentException("Username is not available");
        }
        User newUser = new User(
                signupRequestDTO.getUsername(),
                signupRequestDTO.getEmail(),
                passwordEncoder.encode(signupRequestDTO.getPassword()),
                signupRequestDTO.getFirstName(),
                signupRequestDTO.getLastName()
        );            userRepo.save(newUser);
        System.out.println(signupRequestDTO + "success");
            return new SignupResponseDTO(signupRequestDTO.getUsername() , signupRequestDTO.getEmail());

    }
}

package com.example.jobTracker.Security;

import com.example.jobTracker.Entity.User;
import com.example.jobTracker.Repository.UserRepo;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.extern.slf4j.XSlf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
@Component
@Slf4j
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {
    private final AuthUtil authUtil;
    private final UserRepo userRepo;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        //step 1 : Extract the Auth token sent by the client
        log.info("incoming req : " + request.getRequestURI());

        final String requestTokenHeader = request.getHeader("Authorization");
        final UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken;
        //step 2 : Check if the token is invalid

        if(requestTokenHeader == null || !requestTokenHeader.startsWith("Bearer")){
            filterChain.doFilter(request , response);
            return;
        }

        String token = requestTokenHeader.split(" ")[1];

        String username = authUtil.getUsernameFromToken(token);

        if(username != null || SecurityContextHolder.getContext().getAuthentication() == null){
            User user = userRepo.findByUsername(username).orElseThrow();
            UsernamePasswordAuthenticationToken userToken = new UsernamePasswordAuthenticationToken(user , null , null);
            SecurityContextHolder.getContext().setAuthentication(userToken);
        }
        System.out.println("User authenticated <>");
        filterChain.doFilter(request , response);
    }
}

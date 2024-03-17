package com.example.server.Admin.Jwt;

import com.example.server.Admin.Entity.Account.Account;
import com.example.server.Admin.Entity.Account.Dto.CustomUserDetails;
import com.example.server.Admin.Entity.Enum.Status;
import com.example.server.Admin.Entity.ResponseMessage;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@RequiredArgsConstructor
public class JWTFilter extends OncePerRequestFilter {




    private final JWTUtil jwtUtil;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        // 헤더에서 토큰을 찾는다.
        String authorization = request.getHeader("Authorization");
        System.out.println("토큰 : " + authorization);

        // Authorization 헤더 검사
        if(authorization == null || !authorization.startsWith("Bearer ")){
            System.out.println("토큰이 없습니다.");
            filterChain.doFilter(request,response);
            // 응답하기
            // 메소드 종료 필수
            return;
        }

        String token = authorization.split(" ")[1];

        // 토큰 만료 검증
        if(jwtUtil.isExpired(token)){
            System.out.println("토큰이 만료되었습니다.");
            response.setStatus(401);
            filterChain.doFilter(request, response);

            return ;
        }
        System.out.println("토큰이 유효합니다.");

        // 토큰에서 username과 role을 추출한다.
        String userId = jwtUtil.getUserId(token);
        String role = jwtUtil.getRole(token);

        // userEntity를 생성하여 값 set
        Account account = new Account();
        account.setUserId(userId);
        account.setPassword("dump");
        account.setRole(role);

        System.out.println("유저 정보 : " + account.toString());

        CustomUserDetails userDetails = new CustomUserDetails(account);
        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

        SecurityContextHolder.getContext().setAuthentication(authentication);

        filterChain.doFilter(request,response);
    }


    // Filter에서 제외할 URL 설정
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String[] excludeUrl = {
                "/api/v1/auth/login",
                "/api/v1/auth/signup",
                "/api/v1/survey/**",
        };
        String path = request.getRequestURI();
        return Arrays.stream(excludeUrl).anyMatch(path::startsWith);
    }
}

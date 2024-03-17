package com.example.server.Admin.Jwt;

import com.example.server.Admin.Entity.Account.Dto.CustomUserDetails;
import com.example.server.Admin.Entity.Account.Dto.SignupDto;
import com.example.server.Admin.Repository.AccountRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletInputStream;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.util.StreamUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Collection;
import java.util.Iterator;

public class LoginFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;

    private final JWTUtil jwtUtil;

    // Account 권한 여부
    private final AccountRepository accountRepository;


    public LoginFilter(AuthenticationManager authenticationManager, JWTUtil jwtUtil,AccountRepository accountRepository){
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.accountRepository = accountRepository;
        setFilterProcessesUrl("/api/v1/auth/login");
    }


    /**
     *
     * 클라이언트의 요청을 가로챈다.
     * 자동으로 검증을 진행하게 합니다. UserDetailsService를 통해 검증을 진행합니다.
     */
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        SignupDto signupDto;
        try{
            ObjectMapper objectMapper = new ObjectMapper();
            ServletInputStream inputStream = request.getInputStream();
            String messageBody = StreamUtils.copyToString(inputStream, StandardCharsets.UTF_8);
            signupDto = objectMapper.readValue(messageBody, SignupDto.class);
        }catch (IOException e){
            throw new RuntimeException(e);
        }

        String userId = signupDto.getUserId();
        String password = signupDto.getPassword();


        // 스프링 시큐리티에서 username과 password를 검증하기위해 token을 담아야 한다.
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userId, password, null);

        return authenticationManager.authenticate(authenticationToken);
    }

    /**
     * 인증에 성공했을 때 실행되는 메소드
     * JWT 토큰을 생성하여 응답한다.
     */
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException, ServletException {
        // 토큰을 생성한다.

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        String userId = userDetails.getUsername();

        if(!accountRepository.findByUserId(userId).isState()) {
            response.setStatus(200);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            String message = "{\"message\":\"권한을 부여받지 못했습니다.\", \"status\":\"401\"}";
            response.getWriter().write(message);
            return;
        }



        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();

        String role = auth.getAuthority();

        String token = jwtUtil.createJWT(userId, role, 60*60*10L);
        // Bearer 띄어쓰기 주의
        response.addHeader("Authorization", "Bearer " + token);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        String message = "{\"status\":\"200\"}";
        response.getWriter().write(message);


    }

    /**
     * 인증에 실패했을 때 실행되는 메소드
     */
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        String message = "{\"status\":\"404\"}";
        response.getWriter().write(message);
        response.setStatus(200);
    }

}

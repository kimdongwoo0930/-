package com.example.server.Admin.Controller;

import com.example.server.Admin.Entity.Account.Dto.ChangeRole;
import com.example.server.Admin.Entity.Account.Dto.ChangeStatus;
import com.example.server.Admin.Entity.Account.Dto.SignupDto;
import com.example.server.Admin.Entity.ResponseMessage;
import com.example.server.Admin.Service.AccountService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.bridge.Message;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

/**
 * 계정관련 컨트롤러
 *
 * @author 김동우
 */




@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/")
public class AccountController {
    private final AccountService accountService;
    /**
    * 관리자 페이지 회원가입
     *
     * @param signupDto
     * @return ResponseEntity(메세지, 상태코드)
    * */
    @PostMapping("auth/signup")
    public ResponseEntity<?> Signup(@RequestBody SignupDto signupDto){
        ResponseMessage message = accountService.Signup(signupDto);

        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @GetMapping("auth/admin")
    public ResponseEntity<?> PermissionCheck(){
        return new ResponseEntity<>(200, HttpStatus.OK);
    }

    // 유저 데이터들을 보내주기
    @GetMapping("admin/userInfo")
    public ResponseEntity<?> TakeInfo(){
        ResponseMessage message = accountService.makeInfoList();
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    /**
     * 승인여부 변경
     */
    @PostMapping("admin/userInfo/status")
    public ResponseEntity<?> ChangeStatus(@RequestBody ChangeStatus status){
        ResponseMessage message = accountService.changeStatus(status);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    /**
     * 권한 변경
     *
     */
    @PostMapping("admin/userInfo/role")
    public ResponseEntity<?> ChangeRole(@RequestBody ChangeRole role){
        ResponseMessage message = accountService.changeRole(role);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    /**
     * 토큰 여부
     */
    @GetMapping("check/Access")
    public ResponseEntity<?> CheckAccess(){
        return new ResponseEntity<>(200, HttpStatus.OK);
    }


    // 세션 현재 사용자 아이디 가져오기
//    String name = SecurityContextHolder.getContext().getAuthentication().getName();
}

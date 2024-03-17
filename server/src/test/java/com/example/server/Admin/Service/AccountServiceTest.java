package com.example.server.Admin.Service;

import com.example.server.Admin.Entity.Account.Account;
import com.example.server.Admin.Entity.Account.Dto.SignupDto;
import com.example.server.Admin.Entity.Enum.Status;
import com.example.server.Admin.Entity.ResponseMessage;
import com.example.server.Admin.Repository.AccountRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import static org.junit.jupiter.api.Assertions.*;

class AccountServiceTest {

    @InjectMocks
    AccountService accountService;

    @Mock
    AccountRepository accountRepository;

//    @Test
//    @DisplayName("회원가입 테스트")
//    void signup() {
//        // given
//        SignupDto validDto = new SignupDto();
//        validDto.setUsername("testUser");
//        validDto.setUserId("testUserId");
//        validDto.setPassword("testPassword");
//
//        // When
//        ResponseMessage response = accountService.Signup(validDto);
//
//        // Then
//        assertEquals(Status.OK, response.getStatus());
//        assertEquals("관리자에게 권한을 받으면 접속이 가능합니다.", response.getMessage());
//        assertEquals(null, response.getData());
//
//        // Verify that account is saved
//        Account savedAccount = accountRepository.findByUserId("testUserId");
//        assertNotNull(savedAccount);
//        assertEquals("testUser", savedAccount.getUsername());
//    }
//
//    @Test
//    void takeInfo() {
//    }
}
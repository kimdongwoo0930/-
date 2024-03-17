package com.example.server.Account;

import com.example.server.Admin.Controller.AccountController;
import com.example.server.Admin.Entity.Account.Dto.SignupDto;
import com.example.server.Admin.Service.AccountService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.mock.http.server.reactive.MockServerHttpRequest.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
@DisplayName("계정관련 컨트롤러 테스트")
public class 계정관련_컨트롤러_테스트 {
    // Given 초기설정
    // When 동작 수행
    // Then 결과 예측
    // 2.1. 명명 규칙 -1 : '메서드명_테스트대상상태_예상동작' 형식
    //MethodName_StateUnderTest_ExpectedBehavior
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private AccountService accountService;


}


// // body 데이터 적재
//        Map<String, String> requestMap = new HashMap<>();
//        requestMap.put("name", "myName");
//        requestMap.put("value", "myValue");
//
//        String content = new ObjectMapper().writeValueAsString(requestMap);
//
//        // api 요청
//        MvcResult mvcResult = mockMvc
//                .perform(
//                        post("/api/mock/postTest") // url
//                                .contentType(MediaType.APPLICATION_JSON) // contentType 설정
//                                .content(content) // body 데이터
//                )
//                .andDo(print())
//                .andReturn();
//
//        // response 데이터 변환
//        Map<String, String> responseMap =
//                new ObjectMapper().readValue(mvcResult.getResponse().getContentAsString(), Map.class);
//
//        // 검증
//        Assertions.assertEquals(responseMap.get("method"), "POST"); // response method 데이터 검증
//        Assertions.assertEquals(responseMap.get("name"), "myName"); // response name 데이터 검증
//        Assertions.assertEquals(responseMap.get("value"), "myValue"); // response value 데이터 검증

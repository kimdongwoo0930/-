package com.example.server.Survey.Controller;

import com.example.server.Survey.Entity.Dto.CheckTokenResponseDto;
import com.example.server.Survey.Entity.Dto.ResponseTokenDto;
import com.example.server.Survey.Entity.Dto.SurveyDto;
import com.example.server.Survey.Entity.SurveyToken;
import com.example.server.Survey.Service.SurveyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
public class SurveyController {

    private final SurveyService surveyService;

    /*
    GET 토큰 생성 함수
    ==================
    url 을 통한 업체
    ==================
     */
    @GetMapping("/api/v1/generate-token/{organization}")
    public ResponseTokenDto GenerateToken(@PathVariable String organization){
        return surveyService.GenerateToken(organization);
    }

    /*
    GET 토큰 만료 여부
    =================
    response : false -> 미 만료 , true -> 만료
     */
    @GetMapping("/api/v1/check-token/{token}")
    public CheckTokenResponseDto CheckToken(@PathVariable String token){
        return surveyService.CheckToken(token);
    }


    @PostMapping("/api/v1/submit-survey-response")
    public SurveyToken SubmitResponseToSurvey(@RequestBody SurveyDto data){
        if(data != null){
            return surveyService.save(data);
        }
        return null;
    }

}

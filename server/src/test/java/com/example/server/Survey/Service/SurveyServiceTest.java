package com.example.server.Survey.Service;

import com.example.server.Survey.Entity.Dto.CheckTokenResponseDto;
import com.example.server.Survey.Repository.SurveyTokenRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;



class SurveyServiceTest {

    private final SurveyTokenRepository surveyTokenRepository = mock(SurveyTokenRepository.class);
    private SurveyService surveyService = new SurveyService(surveyTokenRepository);

    @Test
    @DisplayName("토큰으로 회사명 가져오는 테스트")
    void checkToken() {
        String Token = "CNhKWXXVKRzAuD9VvTLVCIY08XvuLbefi5oMoTm3o";

        when(surveyTokenRepository.existsByToken(Token)).thenReturn(true);

        CheckTokenResponseDto result = surveyService.CheckToken(Token);

        assertEquals(Token, result.getToken());
    }
}
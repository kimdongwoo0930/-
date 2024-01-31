package com.example.server.Survey.Service;

import com.example.server.Survey.Entity.Dto.CheckTokenResponseDto;
import com.example.server.Survey.Entity.Dto.ResponseTokenDto;
import com.example.server.Survey.Entity.Survey;
import com.example.server.Survey.Entity.Dto.SurveyDto;
import com.example.server.Survey.Entity.SurveyToken;
import com.example.server.Survey.Repository.SurveyRepository;
import com.example.server.Survey.Repository.SurveyTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Base64;

@Service
@RequiredArgsConstructor
public class SurveyService {

    @Autowired private final SurveyRepository surveyrepository;

    @Autowired private final SurveyTokenRepository surveyTokenRepository;

    public SurveyToken save(SurveyDto data){
        // 토큰으로 회사명 가져오기
        SurveyToken token = surveyTokenRepository.findByToken(data.getToken());
        String organization = token.getOrganization().toString();
        // 회사명 가져와서 엔티티로 생성 후 저장
        Survey Entity = Survey.toEntity(data, organization);
        surveyrepository.save(Entity);
        // 토큰 DB에서 만료로 변경
        token.setExpiration(true);
        return surveyTokenRepository.save(token);

    }

    // 토큰 생성 응답 함수
    public ResponseTokenDto GenerateToken(String organization) {
        // 토큰 생성
        String generateToken = generateRandomToken();
        // 엔티티 생성
        SurveyToken surveyToken = new SurveyToken(organization, generateToken, false);
        // 토큰 저장
        surveyTokenRepository.save(surveyToken);
        // ResponseDto 생성
        ResponseTokenDto response = ResponseTokenDto.toDto(surveyToken);
        // 토큰 전송
        return response;
    }



    // 토큰 여부 및 만료 여부
    public CheckTokenResponseDto CheckToken(String token) {
        // 토큰의 여부 조회
        if(!surveyTokenRepository.existsByToken(token)){ return new CheckTokenResponseDto("", "", true); }
        // 만료 여부확인
        SurveyToken entity = surveyTokenRepository.findByToken(token);
        // 반환 값
        if (entity.isExpiration()) { return new CheckTokenResponseDto(entity.getOrganization(), entity.getToken(), true);}

        return new CheckTokenResponseDto(entity.getOrganization(),entity.getToken(),false);
    }



    // 랜덤 토큰 생성 함수
    private static String generateRandomToken(){
        // 길이 제한
        int tokenLength = 32;

        // 뮤작위 배열 생성
        byte[] randomBytes = new byte[tokenLength];
        SecureRandom secureRandom = new SecureRandom();
        secureRandom.nextBytes(randomBytes);

        // Base 64로 인코딩
        String token = Base64.getEncoder().encodeToString(randomBytes);

        token = token.replaceAll("[^a-zA-Z0-9]", "");

        return token;
    }
}

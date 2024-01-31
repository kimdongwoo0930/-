package com.example.server.Survey.Entity.Dto;

import com.example.server.Survey.Entity.SurveyToken;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResponseTokenDto {
    private String organization;
    private String token;

    public static ResponseTokenDto toDto(SurveyToken entity){
        return ResponseTokenDto.builder()
                .organization(entity.getOrganization())
                .token(entity.getToken())
                .build();

    }
}

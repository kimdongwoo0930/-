package com.example.server.Survey.Entity;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SurveyDto {
    private String organization;

    private String answer_1;

    private String answer_2;

    private String answer_3;

    private String answer_4;

    private String answer_5;

    private String answer_6;

    private String answer_7;

    private String answer_8;

    private String answer_9;

    private String answer_10;

    private String answer_11;


    public static SurveyDto toDto(Survey entity){
        return SurveyDto.builder()
                .organization(entity.getOrganization())
                .answer_1(entity.getAnswer_1())
                .answer_2(entity.getAnswer_2())
                .answer_3(entity.getAnswer_3())
                .answer_4(entity.getAnswer_4())
                .answer_5(entity.getAnswer_5())
                .answer_6(entity.getAnswer_6())
                .answer_7(entity.getAnswer_7())
                .answer_8(entity.getAnswer_8())
                .answer_9(entity.getAnswer_9())
                .answer_10(entity.getAnswer_10())
                .answer_11(entity.getAnswer_11())
                .build();

    }
}



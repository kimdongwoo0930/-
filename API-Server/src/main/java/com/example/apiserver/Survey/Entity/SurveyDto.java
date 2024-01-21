package com.example.apiserver.Survey.Entity;

import jakarta.persistence.Column;
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

}



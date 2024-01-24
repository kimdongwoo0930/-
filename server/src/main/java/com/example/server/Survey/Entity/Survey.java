package com.example.server.Survey.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Table(name = "survey")
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Survey extends BaseTimeEntity {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "organization")
    private String organization;

    @Column(name = "answer_1")
    private String answer_1;

    @Column(name = "answer_2")
    private String answer_2;

    @Column(name = "answer_3")
    private String answer_3;

    @Column(name = "answer_4")
    private String answer_4;

    @Column(name = "answer_5")
    private String answer_5;

    @Column(name = "answer_6")
    private String answer_6;

    @Column(name = "answer_7")
    private String answer_7;

    @Column(name = "answer_8")
    private String answer_8;

    @Column(name = "answer_9")
    private String answer_9;

    @Column(name = "answer_10")
    private String answer_10;

    @Column(name = "answer_11")
    private String answer_11;




    public static Survey toEntity(SurveyDto dto){
        return Survey.builder()
                .organization(dto.getOrganization())
                .answer_1(dto.getAnswer_1())
                .answer_2(dto.getAnswer_2())
                .answer_3(dto.getAnswer_3())
                .answer_4(dto.getAnswer_4())
                .answer_5(dto.getAnswer_5())
                .answer_6(dto.getAnswer_6())
                .answer_7(dto.getAnswer_7())
                .answer_8(dto.getAnswer_8())
                .answer_9(dto.getAnswer_9())
                .answer_10(dto.getAnswer_10())
                .answer_11(dto.getAnswer_11())
                .build();

    }


}

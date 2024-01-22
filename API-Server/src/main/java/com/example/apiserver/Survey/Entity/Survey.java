package com.example.apiserver.Survey.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Table(name = "survey")
@ToString
@NoArgsConstructor
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




    @Builder
    public Survey(String organization,
                  String answer_1,
                  String answer_2,
                  String answer_3,
                  String answer_4,
                  String answer_5,
                  String answer_6,
                  String answer_7,
                  String answer_8,
                  String answer_9,
                  String answer_10,
                  String answer_11) {
        this.organization = organization;
        this.answer_1 = answer_1;
        this.answer_2 = answer_2;
        this.answer_3 = answer_3;
        this.answer_4 = answer_4;
        this.answer_5 = answer_5;
        this.answer_6 = answer_6;
        this.answer_7 = answer_7;
        this.answer_8 = answer_8;
        this.answer_9 = answer_9;
        this.answer_10 = answer_10;
        this.answer_11 = answer_11;
    }
}

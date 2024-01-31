package com.example.server.Survey.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Table(name = "surveyToken")
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Setter
public class SurveyToken extends BaseTimeEntity{

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "organization")
    private String organization;

    @Column(name = "token")
    private String token;

    @Column(name = "expiration")
    private boolean expiration;

    public SurveyToken(String organization, String token, boolean expiration){
        this.organization = organization;
        this.token = token;
        this.expiration = expiration;
    }
}

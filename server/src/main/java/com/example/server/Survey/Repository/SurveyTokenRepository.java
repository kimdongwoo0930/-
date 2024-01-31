package com.example.server.Survey.Repository;

import com.example.server.Survey.Entity.SurveyToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SurveyTokenRepository extends JpaRepository<SurveyToken, Long> {

    boolean existsByToken(String token);

    SurveyToken findByToken(String token);

}

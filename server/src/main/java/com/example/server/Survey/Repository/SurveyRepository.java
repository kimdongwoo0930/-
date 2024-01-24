package com.example.server.Survey.Repository;

import com.example.server.Survey.Entity.Survey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SurveyRepository extends JpaRepository<Survey, Long> {
}

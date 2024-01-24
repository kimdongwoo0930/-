package com.example.apiserver.Survey.Repository;

import com.example.apiserver.Survey.Entity.Survey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SurveyRepository extends JpaRepository<Survey, Long> {
}

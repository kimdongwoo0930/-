package com.example.apiserver.Survey.Service;

import com.example.apiserver.Survey.Entity.Survey;
import com.example.apiserver.Survey.Repository.SurveyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SurveyService {

    private final SurveyRepository repository;

    public Survey save(Survey survey){
        repository.save(survey);
        return survey;
    }
}

package com.example.apiserver.Survey.Controller;

import com.example.apiserver.Survey.Entity.Survey;
import com.example.apiserver.Survey.Service.SurveyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class SurveyController {

    private final SurveyService surveyService;
    @PostMapping(value = "/api/submit-survey-response")
    public ResponseEntity<Survey> SubmitResponseToSurvey(Survey survey){
        return ResponseEntity.ok(surveyService.save(survey));

    }

}

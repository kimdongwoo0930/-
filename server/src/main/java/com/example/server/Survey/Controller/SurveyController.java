package com.example.server.Survey.Controller;

import com.example.server.Survey.Entity.SurveyDto;
import com.example.server.Survey.Service.SurveyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
public class SurveyController {

    private final SurveyService surveyService;

    @PostMapping("/api/submit-survey-response")
    public ResponseEntity<SurveyDto> SubmitResponseToSurvey(@RequestBody SurveyDto data){
        if(data != null){
            return ResponseEntity.ok(surveyService.save(data));
        }
        return null;
    }

}

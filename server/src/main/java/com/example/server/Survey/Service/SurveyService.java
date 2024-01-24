package com.example.server.Survey.Service;

import com.example.server.Survey.Entity.Survey;
import com.example.server.Survey.Entity.SurveyDto;
import com.example.server.Survey.Repository.SurveyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SurveyService {

    private final SurveyRepository surveyrepository;

    public SurveyDto save(SurveyDto data){
        // Dto -> Entity
        Survey Entity = Survey.toEntity(data);

        // Save Entity
        Survey response = surveyrepository.save(Entity);

        // Entity to Dto
        SurveyDto Dto = SurveyDto.toDto(response);
        return Dto;
    }
}

package com.example.server.Admin.Utils;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

public interface Utils {
    /**
     * 시작일과 종료일 사이의 모든 날짜를 가져온다
     */

    public List<LocalDate> getAllDates(LocalDate startDate, LocalDate endDate);


    public List<LocalDate> divideDateRange(String startDateStr, String endDateStr);

}

package com.example.server.Admin.Entity.Reservation.Dto.Request;

import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class currentYear_Month_Day {
    private String year;
    private String month;
    private String day;
}

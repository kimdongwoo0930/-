package com.example.server.Admin.Entity.Reservation.Dto.Request;

import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class start_end_Dto {
    private String start_date;
    private String end_date;
}

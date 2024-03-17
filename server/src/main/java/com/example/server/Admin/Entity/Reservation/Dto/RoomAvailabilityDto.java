package com.example.server.Admin.Entity.Reservation.Dto;

import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class RoomAvailabilityDto {

    private String start_date;
    private String end_date;
    private String room;
}

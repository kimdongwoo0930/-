package com.example.server.Admin.Entity.Reservation.Dto;

import lombok.Data;
import lombok.Getter;

import java.util.Map;

@Data
@Getter
public class Restaurant_Dto {
    private String date;
    private Map<String,Integer> meal_status;
}


/**
 "restaurant" : [
     {
     "date" : "2024-02-15",
     "meal_status" : {
         "breakfast" : 1,
         "launch" : 2,
         "dinner" : 3
     }
     }
 ]
 */
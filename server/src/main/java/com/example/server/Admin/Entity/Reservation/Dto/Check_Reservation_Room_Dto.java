package com.example.server.Admin.Entity.Reservation.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Getter
@RequiredArgsConstructor
@AllArgsConstructor
public class Check_Reservation_Room_Dto {

    private String reservationId;
    private String organization;
    private String date;
    private String color;
    private List<String> roomList;

}

// DATA format
// {
//     "organization" : "organization",
//     "date" : "2021-08-01",
//     "color" : "color",
//     "roomList" : ["room1","room2","room3"]
// }
// 이것들을 리스트로 묶어서 보내기





package com.example.server.Admin.Entity.Reservation.Dto;

import lombok.Data;
import lombok.Getter;

import java.util.List;
import java.util.Map;

@Data
@Getter
public class Update_Dto {
    private String reservationId;
    private String organization;
    private String color_code;
    private String address;
    private String purpose;
    private Integer people;
    private String startdate;
    private String enddate;
    private String customer;
    private String customer_phone;
    private String customer_phone2;
    private String customer_email;
    private Map<String, List<String>> classroom;
    private Map<String, List<String>> rooms;
    private Map<String,Map<String,?>> restaurant;
    private String status;
    private String memo;
}

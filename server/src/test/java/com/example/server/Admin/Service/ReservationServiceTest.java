package com.example.server.Admin.Service;

import com.example.server.Admin.Entity.Reservation.Dto.Request.currentYear_Month_Day;
import com.example.server.Admin.Entity.Reservation.Dto.Request.start_end_Dto;
import com.example.server.Admin.Entity.ResponseMessage;
import com.example.server.Admin.Service.Impl.ReservationServiceImpl;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ReservationServiceTest {

    @Autowired
    private ReservationService reservationService;


    @Test
    void gettingReservationByYear_Month_Day() {


        // given
        currentYear_Month_Day date = new currentYear_Month_Day();
        date.setYear("2024");
        date.setMonth("3");
        date.setDay("12");


        // when
        ResponseMessage message = reservationService.gettingReservationByYear_Month_Day(date);
        System.out.println(message);
        // then
        assertEquals(message.getStatus().toString(), "OK");
    }

    @Test
    void 기간으로_식수데이터_가져오기() {
        // given
        start_end_Dto dto = new start_end_Dto();
        dto.setStart_date("2024-02-29");
        dto.setEnd_date("2024-03-31");

        // when
        ResponseMessage message = reservationService.gettingRestaurantTotal(dto);
        System.out.println(message);
        // then
        assertEquals(message.getStatus().toString(), "OK");
    }


}
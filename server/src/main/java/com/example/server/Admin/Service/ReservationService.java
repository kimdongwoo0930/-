package com.example.server.Admin.Service;

import com.example.server.Admin.Entity.Reservation.Dto.ClassRoomAvailabilityDto;
import com.example.server.Admin.Entity.Reservation.Dto.Create_Reservation;
import com.example.server.Admin.Entity.Reservation.Dto.Request.currentYear_Month;
import com.example.server.Admin.Entity.Reservation.Dto.Request.currentYear_Month_Day;
import com.example.server.Admin.Entity.Reservation.Dto.Request.start_end_Dto;
import com.example.server.Admin.Entity.Reservation.Dto.Update_Dto;
import com.example.server.Admin.Entity.ResponseMessage;

import org.springframework.transaction.annotation.Transactional;

public interface ReservationService {

    /**
     * 게시물 생성 서비스
     */
    @Transactional
    ResponseMessage addReservation(Create_Reservation reservationClassRoomDto);

    /**
     * 강의실 중복체크
     */
    ResponseMessage checkClassRoomEnable(ClassRoomAvailabilityDto dto);

    /**
     * 숙소 기간 데이터 조회
     */
    ResponseMessage checkReservationRoomRange(start_end_Dto dto);


    /**
     * 숙소 단일 데이터 조회
     */
    ResponseMessage checkReservationRoom(String date);

    /**
     * 업체명으로 예약 조회
     */
    @Transactional(readOnly = true)
    ResponseMessage searchReservationUseOrganization(String organization);

    /**
     * 예약 ID로 예약 조회
     */
    @Transactional(readOnly = true)
    ResponseMessage searchReservationUseId(String request);

    /**
     * 해당 연 월 강의실 예약 현황 불러오기
     */
    ResponseMessage gettingReservationClass(currentYear_Month date);

    /**
     * 예약 수정
     */
    @Transactional
    ResponseMessage updateReservation(Update_Dto request);

    /**
     * 해당 연 월 숙소 예약 현황 불러오기
     */
    ResponseMessage gettingReservationRoom(currentYear_Month date);

    /**
     * 해당 연 월 일 강의실및 객실 예약 현황 불러오기
     */
    ResponseMessage gettingReservationByYear_Month_Day(currentYear_Month_Day date);

    /**
     * 해달 기간 식수 리스트 가져오기
     *
     */
    ResponseMessage gettingRestaurantTotal(start_end_Dto dto);
}

package com.example.server.Admin.Controller;


import com.example.server.Admin.Entity.Reservation.Dto.ClassRoomAvailabilityDto;
import com.example.server.Admin.Entity.Reservation.Dto.Create_Reservation;
import com.example.server.Admin.Entity.Reservation.Dto.Request.currentYear_Month;
import com.example.server.Admin.Entity.Reservation.Dto.Request.currentYear_Month_Day;
import com.example.server.Admin.Entity.Reservation.Dto.Request.start_end_Dto;
import com.example.server.Admin.Entity.Reservation.Dto.Update_Dto;
import com.example.server.Admin.Entity.ResponseMessage;
import com.example.server.Admin.Service.AccountService;
import com.example.server.Admin.Service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

/**
 * 강의실예약관련 컨트롤러
 *
 * @Author 김동우
 */



@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/")
public class ReservationController {

    private final ReservationService reservationService;
    private final AccountService accountService;

    /**
     * 권한 여부
     */
    @GetMapping("admin")
    public ResponseEntity<?> PermissionCheck(){
        return new ResponseEntity<>(200, HttpStatus.OK);
    }

    /**
     * 계정 정보 가져오기
     */
    @GetMapping("check/info")
    public ResponseEntity<?> TakeInfo(Authentication authentication){
        ResponseMessage message = accountService.takeInfo(authentication.getName());
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    /**
     * 강의실 예약 현황 불러오기
     */
    @PostMapping("check/reservation/class")
    public ResponseEntity<?> CheckReservationClassRange(@RequestBody currentYear_Month date)
    {
        ResponseMessage message = reservationService.gettingReservationClass(date);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }




    /**
     * 강의실 예약
     *
     * @param reservationClassRoomDto
     * @return ResponseEntity(메세지, 상태코드)
     */
    @PostMapping("admin/reservation")
    public ResponseEntity<?> AddReservation(@RequestBody Create_Reservation reservationClassRoomDto){
        // TODO : 강의실 예약 RequestDto 생성
        ResponseMessage message =  reservationService.addReservation(reservationClassRoomDto);

        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    /**
     * 강의실 예약 수정하기
     */
    @PostMapping("admin/reservation/update")
    public ResponseEntity<?> UpdateReservation(@RequestBody Update_Dto reservationClassRoomDto){
        ResponseMessage message = reservationService.updateReservation(reservationClassRoomDto);

        return new ResponseEntity<>(message, HttpStatus.OK);
    }


    /**
     * 예약 업체명으로 조회하기
     */
    @GetMapping("check/reservation/organization/{organization}")
    public ResponseEntity<?> CheckReservationByOrganization(@PathVariable String organization) {
        ResponseMessage message = reservationService.searchReservationUseOrganization(organization);

        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    /**
     * 예약 번호로 조회하기
     */
    @GetMapping ("check/reservation/{reservationId}")
    public ResponseEntity<?> CheckReservationById(@PathVariable String reservationId){
        ResponseMessage message = reservationService.searchReservationUseId(reservationId);

        return new ResponseEntity<>(message, HttpStatus.OK);
    }


    /**
     * 숙박 year month로 조회한 후 가공해서 보내기
     */
    @PostMapping("check/reservation/rooms")
    public ResponseEntity<?> CheckReservationRooms(@RequestBody currentYear_Month date){
        ResponseMessage message = reservationService.gettingReservationRoom(date);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }




    /**
     * 예약 날짜 중복 체크
     */
    @PostMapping("check/reservation/class/date")
    public ResponseEntity<?> CheckReservationDate(@RequestBody ClassRoomAvailabilityDto dto){
        ResponseMessage message = reservationService.checkClassRoomEnable(dto);

        return new ResponseEntity<>(message, HttpStatus.OK);
    }
    /**
     * 강의실 중복 예약 테스트
     */
    @PostMapping("test/reservation/class/date")
    public ResponseEntity<?> TestReservationDate(@RequestBody ClassRoomAvailabilityDto dto){
        ResponseMessage message = reservationService.checkClassRoomEnable(dto);

        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    /**
     * 숙소 예약 현황 불러오기
     */
    @PostMapping("check/reservation/room")
    public ResponseEntity<?> CheckReservationRoomRange(@RequestBody start_end_Dto dto)
    {
        ResponseMessage message;
        if(dto.getEnd_date() == null){
            message = reservationService.checkReservationRoom(dto.getStart_date());
        }else {
            message = reservationService.checkReservationRoomRange(dto);
        }
        return new ResponseEntity<>(message, HttpStatus.OK);
    }


    /**
     * 해당 연 월 일 강의실및 객실 데이터 가져오기
     */
    @PostMapping("check/reservation/rooms/class")
    public ResponseEntity<?> CheckReservationRoomsClass(@RequestBody currentYear_Month_Day date){
        ResponseMessage message = reservationService.gettingReservationByYear_Month_Day(date);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    /**
     * 시작 날부터 끝 날까지 식수 인원 총 구하기
     */
    @PostMapping("check/reservation/restaurants/totalList")
    public ResponseEntity<?> CheckReservationRestaurantsTotalList(@RequestBody start_end_Dto dto){
        ResponseMessage message = reservationService.gettingRestaurantTotal(dto);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }





}

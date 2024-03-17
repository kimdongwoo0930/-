package com.example.server.Admin.Service.Impl;

import com.example.server.Admin.Entity.Enum.Status;
import com.example.server.Admin.Entity.Reservation.*;
import com.example.server.Admin.Entity.Reservation.Dto.*;
import com.example.server.Admin.Entity.Reservation.Dto.Request.currentYear_Month;
import com.example.server.Admin.Entity.Reservation.Dto.Request.currentYear_Month_Day;
import com.example.server.Admin.Entity.Reservation.Dto.Request.start_end_Dto;
import com.example.server.Admin.Entity.Reservation.Dto.Update_Dto;
import com.example.server.Admin.Entity.ResponseMessage;
import com.example.server.Admin.Repository.*;
import com.example.server.Admin.Service.ReservationService;
import com.example.server.Admin.Utils.UniqueIdGenerator;
import com.example.server.Admin.Utils.Utils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.time.LocalDate;
import java.util.*;


@Service
@RequiredArgsConstructor
@Slf4j
public class ReservationServiceImpl implements ReservationService {

    private final ClassRoomRepository classRoomRepository;

    private final RecordReservationRepository recordReservationRepository;

    private final RestaurantRepository restaurantRepository;

    private final ReservationDetailRepository reservationDetailRepository;

    private final RoomRepository roomRepository;

    private final Utils utils;
    private final UniqueIdGenerator uniqueIdGenerator;
// ==========================================================================================

    /**
     * 강의실 예약 등록
     *
     * @param reservationClassRoomDto
     * @return ResponseMessage
     */
    @Transactional
    @Override
    public ResponseMessage addReservation(Create_Reservation reservationClassRoomDto) {

        // TODO : 예약 데이터를 한번에 받아서 업체 Detail정보 와 영구 데이터 정보 간단 예약 정보를 각각 저장해야한다.

        // 고유 ID 생성
        String uniqueId = uniqueIdGenerator.generateUniqueId();
        // 영구 데이터 저장
        ReservationRecord record = ReservationRecord.toEntity(reservationClassRoomDto, uniqueId);
        recordReservationRepository.save(record);
        System.out.println("영구 데이터 저장 완료");
        // 간단 예약 데이터 저장
        if (reservationClassRoomDto.getClassroom() != null) {
            for (Map.Entry<String, List<String>> classroom : reservationClassRoomDto.getClassroom().entrySet()) {
                List<String> data = classroom.getValue();
                // 간단 예약 데이터 생성
                ClassRoom reservation = ClassRoom.toEntity(reservationClassRoomDto, uniqueId, classroom.getKey(), data.get(0), data.get(1));
                classRoomRepository.save(reservation);
                System.out.println("간단 예약 데이터 저장 완료");

                // 예약 상세 정보 데이터 저장
                ClassRoomDetail detail = ClassRoomDetail.toEntity(reservationClassRoomDto, uniqueId, classroom.getKey(), data.get(0), data.get(1));
                reservationDetailRepository.save(detail);
                System.out.println("예약 상세 정보 데이터 저장 완료");
            }
        }
        List<LocalDate> DateList = utils.divideDateRange(reservationClassRoomDto.getStartdate(), reservationClassRoomDto.getEnddate());
        // 한번에 저장하기위한 전체 데이터 공간 생성
        System.out.println(DateList);
        List<Room> RoomList = new ArrayList<>();
        List<Restaurant> RestaurantList = new ArrayList<>();
        for (LocalDate date : DateList) {
            // 전체
            if (reservationClassRoomDto.getRooms().containsKey(date.toString()) && !reservationClassRoomDto.getRooms().get(date.toString()).isEmpty()) {

                if (reservationClassRoomDto.getRooms().get(date.toString()).size() != 0) {
                    String rooms = "";
                    for (String room : reservationClassRoomDto.getRooms().get(date.toString())) {
                        if (!room.isBlank()) {
                            rooms += room + ",";
                        }
                    }
                    System.out.println(rooms);
                    Room _room = Room.toEntity(date.toString(), uniqueId, rooms, reservationClassRoomDto.getColor_code());
                    RoomList.add(_room);
                }
            }

            if (reservationClassRoomDto.getRestaurant() != null) {
                System.out.println(reservationClassRoomDto.getRestaurant());

                Integer breakfast = Integer.parseInt(String.valueOf(reservationClassRoomDto.getRestaurant().get(date.toString()).get("breakfast")));

                Integer lunch = Integer.parseInt(String.valueOf(reservationClassRoomDto.getRestaurant().get(date.toString()).get("lunch")));
                Integer dinner = Integer.parseInt(String.valueOf(reservationClassRoomDto.getRestaurant().get(date.toString()).get("dinner")));
                String special = (String) reservationClassRoomDto.getRestaurant().get(date.toString()).get("special");

                Restaurant restaurant = Restaurant.toEntity(uniqueId, date.toString(), breakfast, lunch, dinner, special);
                RestaurantList.add(restaurant);
                // 숙소 데이터 저장

            }

            // 식당 데이터 저장
        }
        roomRepository.saveAll(RoomList);
        restaurantRepository.saveAll(RestaurantList);
        System.out.println("숙소및 식당 저장 완료");


        ResponseMessage message = new ResponseMessage();
        message.setStatus(Status.OK);
        message.setMessage("에약 정보를 등록하였습니다.");
        message.setData(null);

        return message;

    }


//
//    public ResponseMessage checkReservationDate(ClassRoomAvailabilityDto dto) {
//        // 예약 날짜 겹치는 데이터 가져오기
//        String start_date = dto.getStart_date();
//        String end_date = dto.getEnd_date();
//        String class_room = dto.getClass_room();
//
//        LocalDate start_Date = LocalDate.of(Integer.parseInt(start_date.split("-")[0]), Integer.parseInt(start_date.split("-")[1]), Integer.parseInt(start_date.split("-")[2]));
//        LocalDate end_Date = LocalDate.of(Integer.parseInt(end_date.split("-")[0]), Integer.parseInt(end_date.split("-")[1]), Integer.parseInt(end_date.split("-")[2]));
//
//        LocalDate lastMonth = start_Date.withDayOfMonth(start_Date.lengthOfMonth());
//        List<LocalDate> dateInRange = divideDateRange(start_Date, lastMonth);
//
//        LocalDate first_Day = lastMonth.plusDays(1);
//        dateInRange.addAll(divideDateRange(first_Day, end_Date));
//
//
//        /**
//         * 클래스룸 리스트 안에 만큼 반복
//         * 해달 연도와 해당 달의 데이터를 모두 가져온다.
//         * 가져온 데이터들을 가쟈와 날짜를 모두 구하고 날짜가 겹치는지 비교한다.
//         */
//        List<ClassRoom> Datas = classRoomRepository.findAllByStartyearAndStartmonthAndClassroom(start_date.split("-")[0], start_date.split("-")[1], class_room);
//
//        for (ClassRoom data : Datas) {
//            LocalDate startDate = LocalDate.of(Integer.parseInt(data.getStartyear()), Integer.parseInt(data.getStartmonth()), Integer.parseInt(data.getStartday()));
//            LocalDate endDate = LocalDate.of(Integer.parseInt(data.getEndyear()), Integer.parseInt(data.getEndmonth()), Integer.parseInt(data.getEndday()));
//
//            // 첫번째 월 마지막 날짜
//            LocalDate lastDay = startDate.withDayOfMonth(startDate.lengthOfMonth());
//            List<LocalDate> InRange = divideDateRange(startDate, lastDay);
//
//            // 두번째 월 마지막 날짜
//            LocalDate firstDay = lastDay.plusDays(1);
//            InRange.addAll(divideDateRange(firstDay, endDate));
//
//            boolean isOverlap = false;
//            for (LocalDate date : dateInRange) {
//                if (InRange.contains(date)) {
//                    isOverlap = true;
//                    break;
//                }
//            }
//
//            if (isOverlap) {
//                ResponseMessage message = new ResponseMessage();
//                message.setStatus(Status.BAD_REQUEST);
//                message.setMessage("예약 날짜가 겹칩니다.");
//                message.setData(null);
//                return message;
//            }
//
//        }
//
//        ResponseMessage message = new ResponseMessage();
//        message.setStatus(Status.OK);
//        message.setMessage("예약 날짜가 겹치지 않습니다.");
//        message.setData(null);
//        return message;
//
//    }
// ==========================================================================================

    /**
     * 강의실 중복체크 리펙토링
     */
    @Override
    public ResponseMessage checkClassRoomEnable(ClassRoomAvailabilityDto dto) {
        // 먼저 dto에서 날짜를 가져오자
        String classroom = dto.getClass_room();
        String start_year = dto.getStart_date().split("-")[0];
        String start_month = dto.getStart_date().split("-")[1];
        String end_year = dto.getEnd_date().split("-")[0];
        String end_month = dto.getEnd_date().split("-")[1];

        /**
         * 1. 시작 연도와 시작 달이 같은 데이터를 가져온다.
         * 2. 마지막 연도와 시작 연도가 같은 데이터를 가져온다.
         * 3. 하지만 시작 연도 시작 월이 끝 연도 끝 월이 같으면 가져오기 더 편하다.
         */
        List<ClassRoom> classRoomList_ = classRoomRepository.findAllByStartyearAndStartmonthAndClassroomOrEndyearAndEndmonthAndClassroom(start_year, start_month, classroom, end_year, end_month, classroom);
        // 검색결과가 없다면 바로 전달
        if (classRoomList_ == null) {
            ResponseMessage message = new ResponseMessage();
            message.setStatus(Status.OK);
            message.setMessage("예약 날짜가 겹치지 않습니다.");
            message.setData(null);
            return message;
        }
        List<ClassRoom> classRoomList = new ArrayList<>(classRoomList_);
        /**
         * 일단 status가 취소 상태인 데이터는 제외하고 가져오자
         */
        classRoomList.removeIf(classRoom -> "취소".equals(classRoom.getStatus()) || classRoom.getStatus() == null);
        if (classRoomList.isEmpty()) {
            ResponseMessage message = new ResponseMessage();
            message.setStatus(Status.OK);
            message.setMessage("예약 날짜가 겹치지 않습니다.");
            message.setData(null);
            return message;
        }
        /**
         * 1. 먼저 월이 넘어가는지 안넘어 가는지부터 확인을 해보자.
         * 2. 가져온 데이터를 가공해야한다. 가져온 데이터를 가지고 날짜를 구하고 그 날짜가 겹치는지 확인해야한다.
         * 3. 겹치는 날짜가 있다면 바로 리턴하고 없다면 저장하자.
         */
        for (ClassRoom classRoom : classRoomList) {
            LocalDate startDate = LocalDate.of(Integer.parseInt(classRoom.getStartyear()), Integer.parseInt(classRoom.getStartmonth()), Integer.parseInt(classRoom.getStartday()));
            LocalDate endDate = LocalDate.of(Integer.parseInt(classRoom.getEndyear()), Integer.parseInt(classRoom.getEndmonth()), Integer.parseInt(classRoom.getEndday()));

            List<LocalDate> DateList = utils.getAllDates(startDate, endDate);


            LocalDate dto_startDate = LocalDate.of(Integer.parseInt(start_year), Integer.parseInt(start_month), Integer.parseInt(dto.getStart_date().split("-")[2]));
            LocalDate dto_endDate = LocalDate.of(Integer.parseInt(end_year), Integer.parseInt(end_month), Integer.parseInt(dto.getEnd_date().split("-")[2]));
            List<LocalDate> DateList_ = utils.getAllDates(dto_startDate, dto_endDate);

            System.out.println(DateList);
            System.out.println(DateList_);

            boolean isOverlap = false;
            for (LocalDate date : DateList_) {
                if (DateList.contains(date)) {
                    isOverlap = true;
                    break;
                }
            }
            if (isOverlap) {
                ResponseMessage message = new ResponseMessage();
                message.setStatus(Status.BAD_REQUEST);
                message.setMessage("예약 날짜가 겹칩니다.");
                message.setData(null);
                return message;
            }
        }

        ResponseMessage message = new ResponseMessage();
        message.setStatus(Status.OK);
        message.setMessage("예약 날짜가 겹치지 않습니다.");
        message.setData(null);
        return message;
    }
// ==========================================================================================

    /**
     * 숙소 기간 데이터 조회
     */
    @Override
    public ResponseMessage checkReservationRoomRange(start_end_Dto dto) {
        // 시작날 부터 마지막날까지 리스트로 정리
        List<LocalDate> DateList = utils.divideDateRange(dto.getStart_date(), dto.getEnd_date());
        System.out.println(DateList);
        // 시작부터 마지막날까지 반복 돌려서 데이터를 가져와서 리스트로 만들기
        List<Check_Reservation_Room_Dto> roomList = new ArrayList<>();
        for (LocalDate date : DateList) {
            String year = date.toString().split("-")[0];
            String month = date.toString().split("-")[1];
            String day = date.toString().split("-")[2];

            List<Room> roomSet = roomRepository.findAllByYearAndMonthAndDay(year, month, day);
            for (Room room : roomSet) {
                ReservationRecord info = recordReservationRepository.findByReservationId(room.getReservationId());
                String organization = info.getOrganization();
                List<String> rooms = Arrays.asList(room.getRoomlist().split(","));
                Check_Reservation_Room_Dto Dto = new Check_Reservation_Room_Dto(info.getReservationId(), organization, date.toString(), room.getColor_code(), rooms);
                roomList.add(Dto);
            }

        }
        // 반환값 생성
        ResponseMessage message = new ResponseMessage();
        if (!roomList.isEmpty()) {
            message.setStatus(Status.OK);
            message.setMessage("예약 정보를 조회하였습니다.");
            message.setData(roomList);
        } else {
            message.setStatus(Status.NOT_FOUND);
            message.setMessage("예약된 방이 없습니다.");
            message.setData(null);
        }

        return message;
    }
// ==========================================================================================

    @Override
    public ResponseMessage checkReservationRoom(String date) {
        // 주소에서 가져온 날짜를 년 월 일 분리
        String year = date.split("-")[0];
        String month = date.split("-")[1];
        String day = date.split("-")[2];
//
//        // DB에서 조회
        List<Room> roomSet = roomRepository.findAllByYearAndMonthAndDay(year, month, day);
        List<Check_Reservation_Room_Dto> roomList = new ArrayList<>();
//
//        // 반환값 생성
        for (Room room : roomSet) {
            ReservationRecord info = recordReservationRepository.findByReservationId(room.getReservationId());
            String organization = info.getOrganization();
            List<String> rooms = Arrays.asList(room.getRoomlist().split(","));
            Check_Reservation_Room_Dto Dto = new Check_Reservation_Room_Dto(info.getReservationId(), organization, date, room.getColor_code(), rooms);
            roomList.add(Dto);
        }
//        // message 생성
        ResponseMessage message = new ResponseMessage();

        if (!roomList.isEmpty()) {
            message.setStatus(Status.OK);
            message.setMessage("예약 정보를 조회하였습니다.");
            message.setData(roomList);
        } else {
            message.setStatus(Status.NOT_FOUND);
            message.setMessage("예약된 방이 없습니다.");
            message.setData(null);
        }

        return message;
    }

    /**
     * 강의실 이름으로 조회하기
     *
     * @param organization
     * @return
     */
    @Transactional(readOnly = true)
    @Override
    public ResponseMessage searchReservationUseOrganization(String organization) {
        // DB조회
        System.out.println(organization);
        List<ReservationRecord> reservationList = recordReservationRepository.findAllByOrganizationContaining(organization);
        if (reservationList == null) {
            ResponseMessage message = new ResponseMessage();
            message.setStatus(Status.NOT_FOUND);
            message.setMessage("예약 정보가 없습니다.");
            message.setData(null);
            return message;
        }
        ResponseMessage message = new ResponseMessage();
        message.setStatus(Status.OK);
        message.setMessage("예약 정보를 조회하였습니다.");
        message.setData(reservationList);
        return message;
    }
// ==========================================================================================

    /**
     * 예약 번호로 예약 조회하기
     *
     * @param reservationId
     * @return
     */
    @Transactional(readOnly = true)
    @Override
    public ResponseMessage searchReservationUseId(String request) {

        System.out.println(request);
        // 전송 객체 생성
        Create_Reservation data = new Create_Reservation();

        // ID를 통해서 먼저 recordReservationClassRepository에서 조회
        ReservationRecord record = recordReservationRepository.findByReservationId(request);
        System.out.println(record);
        if (record == null) {
            ResponseMessage message = new ResponseMessage();
            message.setStatus(Status.NOT_FOUND);
            message.setMessage("예약 정보가 없습니다.");
            message.setData(null);
            return message;
        }
        // 기관명,
        data.setOrganization(record.getOrganization());
        data.setColor_code(record.getColor_code());
        data.setAddress(record.getAddress());
        data.setPeople(record.getPeople());
        data.setPurpose(record.getPurpose());
        data.setStartdate(record.getStart_date());
        data.setEnddate(record.getEnd_date());
        data.setCustomer(record.getCustomer());
        data.setCustomer_phone(record.getCustomer_phone());
        data.setCustomer_phone2(record.getCustomer_phone2());
        data.setCustomer_email(record.getCustomer_email());
        data.setStatus(record.getStatus());
        data.setMemo(record.getMemo());
        // 강의실 확인 후 데이터 삽입
        Map<String, List<String>> classRoomData = new HashMap<>();
        List<ClassRoom> classRoomList = classRoomRepository.findAllByReservationId(request);
        if (classRoomList != null) {
            for (ClassRoom classRoom : classRoomList) {
                List<String> data_ = new ArrayList<>();
                data_.add(classRoom.getStartyear() + "-" + classRoom.getStartmonth() + "-" + classRoom.getStartday());
                data_.add(classRoom.getEndyear() + "-" + classRoom.getEndmonth() + "-" + classRoom.getEndday());
                classRoomData.put(classRoom.getClassroom(), data_);
            }
        }
        data.setClassroom(classRoomData);
        // 숙소 데이터 가져오기
        Map<String, List<String>> roomData = new HashMap<>();
        List<Room> roomList = roomRepository.findAllByReservationId(request);
        if (roomList != null) {
            for (Room room : roomList) {
                List<String> data_ = Arrays.asList(room.getRoomlist().split(","));
                roomData.put(room.getYear() + "-" + room.getMonth() + "-" + room.getDay(), data_);
            }
        }
        data.setRooms(roomData);
        // 식당 데이터 가져오기
        Map<String, Map<String, ?>> restaurantData = new HashMap<>();
        List<Restaurant> restaurantList = restaurantRepository.findAllByReservationId(request);

        if (restaurantList != null) {
            for (Restaurant restaurant : restaurantList) {
                Map<String, String> data_ = new HashMap<>();
                data_.put("breakfast", String.valueOf(restaurant.getBreakfast()));
                data_.put("lunch", String.valueOf(restaurant.getLunch()));
                data_.put("dinner", String.valueOf(restaurant.getDinner()));
                data_.put("special", restaurant.getSpecial());
                restaurantData.put(restaurant.getYear() + "-" + restaurant.getMonth() + "-" + restaurant.getDay(), data_);
            }
        }
        data.setRestaurant(restaurantData);
        // 반환값 생성
        ResponseMessage message = new ResponseMessage();
        message.setStatus(Status.OK);
        message.setMessage("예약 정보를 조회하였습니다.");
        message.setData(data);
        return message;
        //
    }
    // ==========================================================================================

    /**
     * 강의실 현활 가져오기
     *
     * @param date
     * @return
     */
    @Override
    public ResponseMessage gettingReservationClass(currentYear_Month date) {
//        // DB에서 조회하기
        String year = date.getYear();
        String month = date.getMonth();
        month = String.format("%02d", Integer.parseInt(month));
        System.out.println(year + " " + month);
//        List<ClassRoom> classRoomList = classRoomRepository.findAllByStartyearAndStartmonth(year,month);
        List<ClassRoom> classRoomList = classRoomRepository.findAllByStartyearAndStartmonthOrEndyearAndEndmonth(year, month, year, month);
        System.out.println(classRoomList);
//        for(ClassRoom classRoom : classRoomList) {
//            // month 를 검사해서 시작날짜와 끝나는 날짜중에 어떤날짜가 달을 초과하면 수정해줘야한다.
//            // 시작날짜가 맞으면
//            String startYear = classRoom.getStartyear();
//            String startMonth = classRoom.getStartmonth();
//            String endYear = classRoom.getEndyear();
//            String endMonth = classRoom.getEndmonth();
//            if (startMonth.equals(year) && !endMonth.equals(month)) {
//
//            }
        //}
        ResponseMessage message = new ResponseMessage();
        message.setStatus(Status.OK);
        message.setMessage("예약 정보를 조회하였습니다.");
        message.setData(classRoomList);

        return message;
    }

    // ==========================================================================================

    /**
     * 강의실 예약 수정하기
     *
     * @param reservationClassRoomDto
     * @return
     */
    @Transactional
    @Override
    public ResponseMessage updateReservation(Update_Dto request) {

        String uniqueId = request.getReservationId();
        // 먼저 recordReservationClassRepository에서 조회 후 수정
        ReservationRecord record = recordReservationRepository.findByReservationId(uniqueId);
        // 데이터 수정부분
        record.setOrganization(request.getOrganization());
        record.setColor_code(request.getColor_code());
        record.setAddress(request.getAddress());
        record.setPurpose(request.getPurpose());
        record.setPeople(request.getPeople());
        record.setStart_date(request.getStartdate());
        record.setEnd_date(request.getEnddate());
        record.setCustomer(request.getCustomer());
        record.setCustomer_phone(request.getCustomer_phone());
        record.setCustomer_phone2(request.getCustomer_phone2());
        record.setCustomer_email(request.getCustomer_email());
        record.setStatus(request.getStatus());
        record.setMemo(request.getMemo());
        recordReservationRepository.save(record);
        System.out.println("영구 데이터 수정 완료");

        /**
         * status가 취소인경우 모든 예약을 삭제해야한다.
         */
        if (request.getStatus().equals("취소")) {
            classRoomRepository.deleteAllByReservationId(uniqueId);
            roomRepository.deleteAllByReservationId(uniqueId);
            restaurantRepository.deleteAllByReservationId(uniqueId);
            reservationDetailRepository.deleteAllByReservationId(uniqueId);
            ResponseMessage message = new ResponseMessage();
            message.setStatus(Status.OK);
            message.setMessage("예약 정보를 수정하였습니다.");
            message.setData(null);

            return message;
        }

        // classroom 조회 후 수정
        List<ClassRoom> classRoom = classRoomRepository.findAllByReservationId(uniqueId);
        if (classRoom != null) {
            // 데이터가 이미 존재한다면 교체
            // 그냥 삭제하고 다시 저장을 하자
            classRoomRepository.deleteAll(classRoom);
        }
        if (request.getClassroom() != null) {
            for (Map.Entry<String, List<String>> classroom : request.getClassroom().entrySet()) {
                List<String> data = classroom.getValue();
                // 간단 예약 데이터 생성
                ClassRoom reservation = ClassRoom.toEntity(request, uniqueId, classroom.getKey(), data.get(0), data.get(1));
                classRoomRepository.save(reservation);
                System.out.println("간단 예약 데이터 저장 완료");

                // 예약 상세 정보 데이터 저장
                ClassRoomDetail detail = ClassRoomDetail.toEntity(request, uniqueId, classroom.getKey(), data.get(0), data.get(1));
                reservationDetailRepository.save(detail);
                System.out.println("예약 상세 정보 데이터 저장 완료");
            }
        }
        List<LocalDate> DateList = utils.divideDateRange(request.getStartdate(), request.getEnddate());
        // restaurant 데이터 수정
        List<Room> roomList = roomRepository.findAllByReservationId(uniqueId);
        if (roomList != null) {
            roomRepository.deleteAll(roomList);
        }
        List<Restaurant> restaurantList = restaurantRepository.findAllByReservationId(uniqueId);
        if (restaurantList != null) {
            restaurantRepository.deleteAll(restaurantList);
        }

        List<Room> RoomList = new ArrayList<>();
        List<Restaurant> RestaurantList = new ArrayList<>();
        for (LocalDate date : DateList) {
            // 전체
            if (request.getRooms().containsKey(date.toString()) && !request.getRooms().get(date.toString()).isEmpty()) {
                if (request.getRooms().get(date.toString()).size() != 0) {
                    String rooms = "";
                    for (String room : request.getRooms().get(date.toString())) {
                        if (!room.isBlank()) {
                            rooms += room + ",";
                        }
                    }
                    System.out.println(rooms);
                    Room _room = Room.toEntity(date.toString(), uniqueId, rooms, request.getColor_code());
                    RoomList.add(_room);
                }
            }

            if (request.getRestaurant() != null) {
                System.out.println(request.getRestaurant());

                Integer breakfast = Integer.parseInt(String.valueOf(request.getRestaurant().get(date.toString()).get("breakfast")));

                Integer lunch = Integer.parseInt(String.valueOf(request.getRestaurant().get(date.toString()).get("lunch")));
                Integer dinner = Integer.parseInt(String.valueOf(request.getRestaurant().get(date.toString()).get("dinner")));
                String special = (String) request.getRestaurant().get(date.toString()).get("special");

                Restaurant restaurant = Restaurant.toEntity(uniqueId, date.toString(), breakfast, lunch, dinner, special);
                RestaurantList.add(restaurant);
                // 숙소 데이터 저장
            }
            // 식당 데이터 저장
        }
        roomRepository.saveAll(RoomList);
        restaurantRepository.saveAll(RestaurantList);
        System.out.println("숙소및 식당 저장 완료");

        ResponseMessage message = new ResponseMessage();
        message.setStatus(Status.OK);
        message.setMessage("예약 정보를 수정하였습니다.");
        message.setData(null);
        return message;

    }
    // ==========================================================================================

    /**
     * 객실 데이터 가공및 전송
     *
     * @param date
     * @return
     */
    @Override
    public ResponseMessage gettingReservationRoom(currentYear_Month date) {

        String year = date.getYear();
        String month = date.getMonth();
        month = String.format("%02d", Integer.parseInt(month));
        List<Room> roomList = roomRepository.findAllByYearAndMonthAndRoomlistIsNotNull(year, month);
        // 데이터를 불러온 후 가공해야한다.
        // 리스트에 기업별로 정리를 해서 보내줘야할것같다.
        // 상세보기는 어차피 예약 번호로 똑같이 하면된다.
        /**
         * { 예약번호 : [ 날짜들 ]  },
         * { 예약번호 : [ 날짜들 ]  },
         * 이런 식으로 하면 그냥 맵 돌려서 하면되지않을까?
         */
        // 먼저 리스트안에 몇가지의 예약 번호가 있는지 찾아야할것같다.
        List<String> reservationIdList = new ArrayList<>();
        Map<String, Map<String, Object>> Data = new HashMap<>();

        for (Room room : roomList) {
            if (!Objects.equals(room.getRoomlist(), "") && !Objects.equals(room.getRoomlist(), ",")) {
                if (!reservationIdList.contains(room.getReservationId())) {
                    reservationIdList.add(room.getReservationId());
                }
            }
        }

        System.out.println(reservationIdList);

        for (String reservationId : reservationIdList) {
            Map<String, Object> makedata = new HashMap<>();
            List<String> dateList = new ArrayList<>();
            String color_code = "";
            String organization = "";
            for (Room room : roomList) {
                if (!Objects.equals(room.getRoomlist(), "") && !Objects.equals(room.getRoomlist(), ",") && room.getReservationId().equals(reservationId)) {
                    // 업체명도 구해야한다
                    organization = recordReservationRepository.findByReservationId(room.getReservationId()).getOrganization();
                    dateList.add(room.getDay());
                    color_code = room.getColor_code();
                }
            }

            // 그 후 예약 번호를 돌리면서 날짜들을 모두 가져와서 객체형식으로 만들어주자.

            makedata.put("organization", organization);
            makedata.put("dates", dateList);
            makedata.put("color_code", color_code);
            Data.put(reservationId, makedata);
        }


        ResponseMessage message = new ResponseMessage();
        message.setStatus(Status.OK);
        message.setMessage("예약 정보를 조회하였습니다.");
        message.setData(Data);

        return message;
    }


    // ==========================================================================================

    /**
     * 해당 연 월 날 강의실및 객실 정보 가져오기
     */
    @Override
    public ResponseMessage gettingReservationByYear_Month_Day(currentYear_Month_Day date) {
        // 연 월 달 가져와서 수정함
        String year = date.getYear();
        String month = date.getMonth();
        String day = date.getDay();
        month = String.format("%02d", Integer.parseInt(month));
        day = String.format("%02d", Integer.parseInt(day));
        // 먼저 강의실 데이터부터 만들자
        // 해당 하는 달의 데이터를 모두 들고와서 중간 날짜를 모두 구하고 그 리스트에 해당 일이 포함되면 가져가면 된다.
        List<ClassRoom> classRoomList = classRoomRepository.findAllByStartyearAndStartmonthOrEndyearAndEndmonth(year, month, year, month);
        List<String> classRoomOrganization = new ArrayList<>();
        for (ClassRoom classRoom : classRoomList) {
            LocalDate startDate = LocalDate.of(Integer.parseInt(classRoom.getStartyear()), Integer.parseInt(classRoom.getStartmonth()), Integer.parseInt(classRoom.getStartday()));
            LocalDate endDate = LocalDate.of(Integer.parseInt(classRoom.getEndyear()), Integer.parseInt(classRoom.getEndmonth()), Integer.parseInt(classRoom.getEndday()));
            List<LocalDate> dates = utils.getAllDates(startDate, endDate);

            LocalDate targetDate = LocalDate.of(Integer.parseInt(year), Integer.parseInt(month), Integer.parseInt(day));
            if (dates.contains(targetDate)) {
                classRoomOrganization.add(classRoom.getOrganization());
            }
        }

        // 숙소 데이터 가져오기
        List<Room> roomList = roomRepository.findAllByYearAndMonthAndDay(year, month, day);
        List<String> roomOrganization = new ArrayList<>();
        for (Room room : roomList) {
            roomOrganization.add(recordReservationRepository.findByReservationId(room.getReservationId()).getOrganization());
        }

        Map<String, Object> data = new HashMap<>();

        data.put("classRoom", classRoomOrganization);
        data.put("room", roomOrganization);


        ResponseMessage message = new ResponseMessage();
        message.setStatus(Status.OK);
        message.setMessage("예약 정보를 조회하였습니다.");
        message.setData(data);

        return message;
    }

    /**
     * 기간중에 식수 리스트 가져오기
     */
    @Override
    public ResponseMessage gettingRestaurantTotal(start_end_Dto dto) {
        // 먼저 사이 기간을 모두 구하자
        List<LocalDate> DateList = utils.divideDateRange(dto.getStart_date(), dto.getEnd_date());
        System.out.println(DateList);
        // 해당 날짜에 해당하는 식수 데이터를 가져와서 리스트에 추가해주자
        List<Object> Response = new ArrayList<>();
        for (LocalDate date : DateList) {
            Map<String,Object> Data = new HashMap<>();
            String year = date.toString().split("-")[0];
            String month = date.toString().split("-")[1];
            String day = date.toString().split("-")[2];
            List<Restaurant> restaurantList = restaurantRepository.findAllByYearAndMonthAndDay(year, month, day);
            Map<String, Integer> data = new HashMap<>();
            data.put("breakfast", 0);
            data.put("lunch", 0);
            data.put("dinner", 0);
            for (Restaurant restaurant : restaurantList) {
                data.put("breakfast", data.get("breakfast") + restaurant.getBreakfast());
                data.put("lunch", data.get("lunch") + restaurant.getLunch());
                data.put("dinner", data.get("dinner") + restaurant.getDinner());
            }

            // 데이터로 만들어보자
            Data.put("title",date.toString());
            Data.put("start",date.toString());
            Data.put("food",data);
            Response.add(Data);
        }

        ResponseMessage message = new ResponseMessage();
        message.setStatus(Status.OK);
        message.setMessage("예약 정보를 조회하였습니다.");
        message.setData(Response);

        return message;


    }


}

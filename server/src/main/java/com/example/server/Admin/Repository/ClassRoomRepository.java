package com.example.server.Admin.Repository;

import com.example.server.Admin.Entity.Reservation.ClassRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClassRoomRepository extends JpaRepository<ClassRoom, Long>{

//    @Query("SELECT e FROM Reservation_ClassRoom e WHERE (e.start_year = :year AND e.start_month = :month) OR (e.end_year = :year AND e.end_month = :month)")

    List<ClassRoom> findAllByStartyearAndStartmonth(String year, String month);

    List<ClassRoom> findAllByEndyearAndEndmonth(String year, String month);

    List<ClassRoom> findAllByStartyearAndStartmonthOrEndyearAndEndmonth(String startyear, String startmonth, String endyear, String endmonth);



    List<ClassRoom> findAllByStartyearAndStartmonthAndClassroom(String year, String month, String classroom);

    ClassRoom findByReservationId(String reservationId);

    List<ClassRoom> findAllByReservationId(String reservationId);


    /**
     * 강의실 예약 중복 체크 부분
     */
    List<ClassRoom> findAllByStartyearAndStartmonthAndClassroomOrEndyearAndEndmonthAndClassroom(String startYear, String startMonth, String classroom1, String endYear, String endMonth, String classroom2);


    void deleteAllByReservationId(String uniqueId);
}

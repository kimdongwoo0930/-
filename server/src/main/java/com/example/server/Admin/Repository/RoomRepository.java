package com.example.server.Admin.Repository;

import com.example.server.Admin.Entity.Reservation.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {
    Room findByYearAndMonthAndDay(String year, String month, String day);

    List<Room> findAllByYearAndMonthAndDay(String year, String month, String day);

    List<Room> findAllByReservationId(String reservationId);

    List<Room> findAllByYearAndMonth(String year, String month);

    List<Room> findAllByYearAndMonthAndRoomlistIsNotNull(String year, String month);

    void deleteAllByReservationId(String uniqueId);
}
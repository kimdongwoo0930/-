package com.example.server.Admin.Repository;

import com.example.server.Admin.Entity.Reservation.ClassRoomDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservationDetailRepository extends JpaRepository<ClassRoomDetail, Long> {

    void deleteAllByReservationId(String uniqueId);
}

package com.example.server.Admin.Repository;

import com.example.server.Admin.Entity.Reservation.ReservationRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecordReservationRepository extends JpaRepository<ReservationRecord, Long>{
    List<ReservationRecord> findAllByOrganizationContaining(String organization);

    ReservationRecord findByReservationId(String reservationId);

}

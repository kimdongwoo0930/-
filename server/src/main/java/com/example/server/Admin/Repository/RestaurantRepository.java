package com.example.server.Admin.Repository;

import com.example.server.Admin.Entity.Reservation.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    List<Restaurant> findAllByReservationId(String reservationId);

    void deleteAllByReservationId(String uniqueId);

    List<Restaurant> findAllByYearAndMonthAndDay(String year, String month, String day);
}

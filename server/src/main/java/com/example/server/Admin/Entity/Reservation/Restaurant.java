package com.example.server.Admin.Entity.Reservation;

import com.example.server.Admin.Entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

@Table(name = "restaurant")
@NoArgsConstructor
@Getter
@Entity
@ToString
@AllArgsConstructor
@Builder
@Setter
public class Restaurant extends BaseTimeEntity {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "reservation_id")
    private String reservationId;

    @Column(name = "year")
    private String year;

    @Column(name = "month")
    private String month;

    @Column(name = "day")
    private String day;

    @Column(name = "breakfast")
    private Integer breakfast;

    @Column(name = "lunch")
    private Integer lunch;

    @Column(name = "dinner")
    private Integer dinner;

    @Column(name = "special")
    private String special;

    public static Restaurant toEntity(String reservation_id,
                                      String date,
                                      Integer breakfast,
                                      Integer lunch,
                                      Integer dinner,
                                      String special){
        String year = date.split("-")[0];
        String month = date.split("-")[1];
        String day = date.split("-")[2];
        return Restaurant.builder()
                .reservationId(reservation_id)
                .year(year)
                .month(month)
                .day(day)
                .breakfast(breakfast)
                .lunch(lunch)
                .dinner(dinner)
                .special(special)
                .build();
    }

}

package com.example.server.Admin.Entity.Reservation;

import com.example.server.Admin.Entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

@Table(name = "room")
@NoArgsConstructor
@Getter
@Entity
@ToString
@AllArgsConstructor
@Builder
@Setter
public class Room extends BaseTimeEntity {
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

    // 방마다 개별로 그냥 저장할까?
    // 아니다 그냥 "201,202,203" 이런식으로 저장하자
    @Column(name = "roomList")
    private String roomlist;

    @Column(name = "color_code")
    private String color_code;

    // ToEntity 생성
    public static Room toEntity(String date,
                                String reservation_id,
                                String room,
                                String color_code
    ){
     return Room.builder()
             .year(date.split("-")[0])
             .month(date.split("-")[1])
             .day(date.split("-")[2])
             .reservationId(reservation_id)
             .roomlist(room)
             .color_code(color_code)
             .build();
    }


}

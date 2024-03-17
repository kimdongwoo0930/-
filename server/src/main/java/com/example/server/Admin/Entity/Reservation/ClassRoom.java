package com.example.server.Admin.Entity.Reservation;

import com.example.server.Admin.Entity.Reservation.Dto.Create_Reservation;
import com.example.server.Admin.Entity.Reservation.Dto.Update_Dto;
import com.example.server.Survey.Entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

@Table(name = "classroom")
@NoArgsConstructor
@Getter
@Entity
@ToString
@AllArgsConstructor
@Builder
@Setter
public class ClassRoom extends BaseTimeEntity {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "organization")
    private String organization;

    @Column(name = "class_room")
    private String classroom;

    @Column(name = "start_year")
    private String startyear;

    @Column(name = "start_month")
    private String startmonth;

    @Column(name = "start_day")
    private String startday;

    @Column(name = "end_year")
    private String endyear;

    @Column(name = "end_month")
    private String endmonth;

    @Column(name = "end_day")
    private String endday;

    @Column(name = "reservation_id")
    private String reservationId;

    @Column(name = "color_code")
    private String color_code;

    @Column(name = "status")
    private String status;

    // TODO : DTO 생성 후
    public static ClassRoom toEntity(Create_Reservation dto, String reservation_id, String classroom, String start, String end){
        return ClassRoom.builder()
                .organization(dto.getOrganization())
                .classroom(classroom)
                .startyear(start.split("-")[0])
                .startmonth(start.split("-")[1])
                .startday(start.split("-")[2])
                .endyear(end.split("-")[0])
                .endmonth(end.split("-")[1])
                .endday(end.split("-")[2])
                .color_code(dto.getColor_code())
                .reservationId(reservation_id)
                .status(dto.getStatus())
                .build();
    }

    public static ClassRoom toEntity(Update_Dto dto, String reservationId, String classroom, String start, String end){
        return ClassRoom.builder()
                .organization(dto.getOrganization())
                .classroom(classroom)
                .startyear(start.split("-")[0])
                .startmonth(start.split("-")[1])
                .startday(start.split("-")[2])
                .endyear(end.split("-")[0])
                .endmonth(end.split("-")[1])
                .endday(end.split("-")[2])
                .color_code(dto.getColor_code())
                .reservationId(reservationId)
                .status(dto.getStatus())
                .build();
    }



}

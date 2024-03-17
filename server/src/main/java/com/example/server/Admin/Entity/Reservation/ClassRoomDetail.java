package com.example.server.Admin.Entity.Reservation;


import com.example.server.Admin.Entity.Reservation.Dto.Create_Reservation;
import com.example.server.Admin.Entity.Reservation.Dto.Update_Dto;
import jakarta.persistence.*;
import lombok.*;

@Table(name = "classroom_detail")
@NoArgsConstructor
@Getter
@Entity
@ToString
@AllArgsConstructor
@Builder
@Setter
public class ClassRoomDetail {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "reservation_id")
    private String reservationId;

    @Column(name = "organization")
    private String organization;

    @Column(name = "class_room")
    private String classroom;

    @Column(name = "address")
    private String address;

    @Column(name = "purpose")
    private String purpose;

    @Column(name = "people")
    private Integer people;

    @Column(name = "start_reservation_date")
    private String startdate;

    @Column(name = "end_reservation_date")
    private String enddate;

    @Column(name = "customer")
    private String customer;

    @Column(name = "customer_phone")
    private String customerphone;

    @Column(name = "customer_phone2")
    private String customerphone2;

    @Column(name = "customer_email")
    private String customeremail;

    @Column(name = "color_code")
    private String colorcode;

    @Column(name = "memo" , length = 1000)
    private String memo;

    @Column(name = "status")
    private String status;

    public static ClassRoomDetail toEntity(
            Create_Reservation dto,
            String reservation_id,
            String classroom,
            String start,
            String end
    ) {
        return ClassRoomDetail.builder()
                .reservationId(reservation_id)
                .organization(dto.getOrganization())
                .address(dto.getAddress())
                .purpose(dto.getPurpose())
                .people(dto.getPeople())
                .classroom(classroom)
                .startdate(start)
                .enddate(end)
                .customer(dto.getCustomer())
                .customerphone(dto.getCustomer_phone())
                .customerphone2(dto.getCustomer_phone2())
                .customeremail(dto.getCustomer_email())
                .colorcode(dto.getColor_code())
                .memo(dto.getMemo())
                .status(dto.getStatus())
                .build();
    }

    public static ClassRoomDetail toEntity(
            Update_Dto dto,
            String reservation_id,
            String classroom,
            String start,
            String end
    ) {
        return ClassRoomDetail.builder()
                .reservationId(reservation_id)
                .organization(dto.getOrganization())
                .address(dto.getAddress())
                .purpose(dto.getPurpose())
                .people(dto.getPeople())
                .classroom(classroom)
                .startdate(start)
                .enddate(end)
                .customer(dto.getCustomer())
                .customerphone(dto.getCustomer_phone())
                .customerphone2(dto.getCustomer_phone2())
                .customeremail(dto.getCustomer_email())
                .colorcode(dto.getColor_code())
                .memo(dto.getMemo())
                .status(dto.getStatus())
                .build();
    }
}


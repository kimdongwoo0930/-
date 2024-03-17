package com.example.server.Admin.Entity.Reservation;

import com.example.server.Admin.Entity.BaseTimeEntity;
import com.example.server.Admin.Entity.Reservation.Dto.Create_Reservation;
import jakarta.persistence.*;
import lombok.*;

@Table(name = "record_reservation")
@NoArgsConstructor
@Getter
@Entity
@ToString
@AllArgsConstructor
@Builder
@Setter
public class ReservationRecord extends BaseTimeEntity {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "organization")
    private String organization;

    @Column(name = "purpose")
    private String purpose;

    @Column(name = "people")
    private Integer people;

    @Column(name = "address")
    private String address;

    @Column(name = "color_code")
    private String color_code;

    @Column(name = "start_date")
    private String start_date;

    @Column(name = "end_date")
    private String end_date;

    @Column(name = "reservation_id")
    private String reservationId;

    @Column(name = "customer")
    private String customer;

    @Column(name = "customer_phone")
    private String customer_phone;

    @Column(name = "customer_phone2")
    private String customer_phone2;

    @Column(name = "customer_email")
    private String customer_email;

    @Column(name = "memo" , length = 1000)
    private String memo;

    @Column(name = "status")
    private String status;

    public static ReservationRecord toEntity(Create_Reservation dto, String reservation_id){
        return ReservationRecord.builder()
                .organization(dto.getOrganization())
                .color_code(dto.getColor_code())
                .address(dto.getAddress())
                .people(dto.getPeople())
                .purpose(dto.getPurpose())
                .start_date(dto.getStartdate())
                .end_date(dto.getEnddate())
                .reservationId(reservation_id)
                .customer(dto.getCustomer())
                .customer_phone(dto.getCustomer_phone())
                .customer_phone2(dto.getCustomer_phone2())
                .customer_email(dto.getCustomer_email())
                .memo(dto.getMemo())
                .status(dto.getStatus())
                .build();

    }
}

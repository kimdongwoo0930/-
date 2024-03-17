package com.example.server.Admin.Entity.Account;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "account")
@NoArgsConstructor
@Getter
@Entity
@ToString
@AllArgsConstructor
@Builder
@Setter
public class Account {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username")
    private String username;

    @Column(name = "userId")
    private String userId;

    @Column(name = "password")
    private String password;


    @Column(name = "role")
    private String role;

    @Column(name = "state")
    private boolean state;


    public static Account toEntity(String name,String userId, String password) {
        return Account.builder()
                .userId(userId)
                .username(name)
                .password(password)
                .role("ROLE_USER")
                .state(false)
                .build();
    }


}

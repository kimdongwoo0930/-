package com.example.server.Admin.Entity.Account.Dto;


import lombok.*;

@Getter
@Setter
@Data
@RequiredArgsConstructor
public class SignupDto {
    private String username;
    private String userId;
    private String password;

}

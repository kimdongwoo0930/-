package com.example.server.Admin.Entity.Account.Dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class UserInfo {
    private String userId;
    private String username;
    private boolean status;
    private String role;
}

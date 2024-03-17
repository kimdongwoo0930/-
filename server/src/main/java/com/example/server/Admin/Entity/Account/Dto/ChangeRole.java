package com.example.server.Admin.Entity.Account.Dto;

import lombok.Data;
import lombok.Getter;

@Getter
@Data
public class ChangeRole {
    private String userId;
    private String role;
}

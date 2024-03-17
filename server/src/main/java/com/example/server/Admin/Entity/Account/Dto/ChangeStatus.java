package com.example.server.Admin.Entity.Account.Dto;

import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class ChangeStatus {
    private String userId;
    private boolean status;
}

package com.example.server.Admin.Entity;

import com.example.server.Admin.Entity.Enum.Status;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class ResponseMessage {

    private Status status;
    private String message;
    private Object data;
}

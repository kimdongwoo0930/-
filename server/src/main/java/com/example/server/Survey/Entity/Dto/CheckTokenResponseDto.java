package com.example.server.Survey.Entity.Dto;


import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
public class CheckTokenResponseDto {
    private String organization;
    private String token;
    private boolean expiration;

    public CheckTokenResponseDto(String organization, String token, boolean expiration){
        this.organization = organization;
        this.token = token;
        this.expiration = expiration;
    }
}

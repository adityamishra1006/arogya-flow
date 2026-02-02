package com.arogya.flow.dto;

import com.arogya.flow.entity.enums.TokenStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class TokenResponseDTO {
    private String tokenNumber;
    private TokenStatus status;
    private Integer queuePosition;
}

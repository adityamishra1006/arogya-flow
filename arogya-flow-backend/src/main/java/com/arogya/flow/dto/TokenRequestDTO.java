package com.arogya.flow.dto;

import com.arogya.flow.entity.enums.TokenSource;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class TokenRequestDTO {
    private Long doctorId;
    private Long slotId;
    private TokenSource source;
}

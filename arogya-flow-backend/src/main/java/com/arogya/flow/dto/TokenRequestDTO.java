package com.arogya.flow.dto;

import com.arogya.flow.entity.enums.TokenSource;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class TokenRequestDTO {
    @NotNull
    private Long doctorId;
    private Long slotId;
    @NotNull
    private TokenSource source;
}

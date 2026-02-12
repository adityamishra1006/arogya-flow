package com.arogya.flow.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SlotBookingRequestDTO {
    private Long slotId;
    private String patientName;
    private String email;
}

package com.arogya.flow.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AppointmentDTO {
    private Long id;
    private String patientName;
    private String email;
    private Long slotId;
}

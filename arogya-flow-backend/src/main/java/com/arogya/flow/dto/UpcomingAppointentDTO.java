package com.arogya.flow.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UpcomingAppointentDTO {
    private String time;
    private String patientName;
    private String doctorName;
}

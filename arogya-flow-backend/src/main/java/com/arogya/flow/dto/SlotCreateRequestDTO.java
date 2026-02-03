package com.arogya.flow.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
public class SlotCreateRequestDTO {
    private LocalDate slotDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private Integer slotDurationInMinutes;
}

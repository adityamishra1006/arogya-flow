package com.arogya.flow.dto;

import com.arogya.flow.entity.enums.SlotStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.internal.util.actions.LoadClass;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@AllArgsConstructor
public class SlotAvailabilityDTO {

    private Long id;

    private LocalDate slotDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private SlotStatus status;

    private Integer totalPatients;
    private Integer remainingPatients;

    private String patientName;
}

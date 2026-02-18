package com.arogya.flow.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class DashboardStatsDTO {
    private Long totalDoctors;
    private Long totalSlots;
    private Long bookedSlots;
    private Long openSlots;

    private Long todaysBookings;
    private String nextAvailableSlot;
    private String todayDate;
}

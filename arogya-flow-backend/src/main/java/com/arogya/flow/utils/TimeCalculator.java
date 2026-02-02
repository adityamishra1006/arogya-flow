package com.arogya.flow.utils;

import org.springframework.cglib.core.Local;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public class TimeCalculator {
    private TimeCalculator(){

    }

    public static boolean isSlotActive(LocalDate slotDate, LocalTime startTime, LocalTime endTime){
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime slotStart = LocalDateTime.of(slotDate, startTime);
        LocalDateTime slotEnd = LocalDateTime.of(slotDate, endTime);

        return !now.isBefore(slotStart) && !now.isAfter(slotEnd);
    }

    public static boolean isSlotExpired(LocalDate slotDate, LocalTime endTime){
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime slotEnd = LocalDateTime.of(slotDate, endTime);

        return now.isAfter(slotEnd);
    }
}

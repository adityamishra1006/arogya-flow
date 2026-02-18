package com.arogya.flow.controller;


import com.arogya.flow.dto.DashboardStatsDTO;
import com.arogya.flow.entity.Slot;
import com.arogya.flow.entity.enums.SlotStatus;
import com.arogya.flow.repository.AppointmentRepository;
import com.arogya.flow.repository.DoctorRepository;
import com.arogya.flow.repository.SlotRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashBoardController{
    private final DoctorRepository doctorRepository;
    private final SlotRepository slotRepository;
    private final AppointmentRepository appointmentRepository;

    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsDTO> getDashboardStats(){
        LocalDate today = LocalDate.now();
        LocalTime now = LocalTime.now();

        long totalDoctors = doctorRepository.count();
        long totalSlots = slotRepository.countBySlotDate(today);
        long bookedSlots = slotRepository.countBySlotDateAndStatus(today, SlotStatus.BOOKED);
        long openSlots = slotRepository.countBySlotDateAndStatus(today, SlotStatus.OPEN);
        long todaysBookings = appointmentRepository.countBySlot_SlotDate(today);

        Optional<Slot> nextSlot = slotRepository
                .findFirstBySlotDateAndStatusAndStartTimeAfterOrderByStartTimeAsc(
                        today,
                        SlotStatus.OPEN,
                        now
                );

        String nextAvailableSlot = nextSlot
                .map(slot -> slot.getStartTime() + " - " + slot.getEndTime())
                .orElse("No slots available");

        String todayDate = today.format(DateTimeFormatter.ofPattern("dd MMM yyyy"));

        DashboardStatsDTO stats = new DashboardStatsDTO(
                totalDoctors,
                totalSlots,
                bookedSlots,
                openSlots,
                todaysBookings,
                nextAvailableSlot,
                todayDate
        );

        return ResponseEntity.ok(stats);
    }

    @PostMapping("/reset")
    public ResponseEntity<String> resetDashboard() {

        appointmentRepository.deleteAll();
        slotRepository.deleteAll();

        return ResponseEntity.ok("Dashboard reset successfully");
    }
}
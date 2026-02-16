package com.arogya.flow.controller;

import com.arogya.flow.dto.DashboardStatsDTO;
import com.arogya.flow.entity.enums.SlotStatus;
import com.arogya.flow.entity.enums.TokenStatus;
import com.arogya.flow.repository.AppointmentRepository;
import com.arogya.flow.repository.DoctorRepository;
import com.arogya.flow.repository.SlotRepository;
import com.arogya.flow.repository.TokenRepository;
import com.arogya.flow.service.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalTime;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/dashboard")
public class DashBoardController {
    private final DoctorRepository doctorRepository;
    private final SlotRepository slotRepository;
    private final TokenRepository tokenRepository;
    private final AppointmentRepository appointmentRepository;

    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsDTO> getDashBoardStats(){
        LocalDate today = LocalDate.now();
        LocalTime now = LocalTime.now();

        long totalDoctors = doctorRepository.count();
        long totalSlots = slotRepository.count();
        long upcomingAppiontment = appointmentRepository.countUpcomingAppointments(today, now);

        long bookedSlots = slotRepository.countByStatus(SlotStatus.BOOKED);
        long openSlots = slotRepository.countByStatus(SlotStatus.OPEN);

        DashboardStatsDTO stats = new DashboardStatsDTO(
                totalDoctors,
                totalSlots,
                bookedSlots,
                openSlots,
                upcomingAppiontment
        );
        return ResponseEntity.ok(stats);
    }

    @PostMapping("/reset")
    public ResponseEntity<String> resetDashboard(){
        appointmentRepository.deleteAll();
        slotRepository.deleteAll();

        return ResponseEntity.ok("Dashboard reset successfully");
    }
}

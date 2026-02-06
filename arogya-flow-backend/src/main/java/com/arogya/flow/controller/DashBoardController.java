package com.arogya.flow.controller;

import com.arogya.flow.dto.DashboardStatsDTO;
import com.arogya.flow.entity.enums.TokenStatus;
import com.arogya.flow.repository.DoctorRepository;
import com.arogya.flow.repository.SlotRepository;
import com.arogya.flow.repository.TokenRepository;
import com.arogya.flow.service.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/dashboard")
public class DashBoardController {
    private final DoctorRepository doctorRepository;
    private final SlotRepository slotRepository;
    private final TokenRepository tokenRepository;

    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsDTO> getDashBoardStats(){
        long totalDoctors = doctorRepository.count();
        long totalSlots = slotRepository.count();
        long totalTokens = tokenRepository.count();

        long activityTokens = tokenRepository
                .findAll()
                .stream()
                .filter(token ->
                        token.getStatus() == TokenStatus.CREATED ||
                                token.getStatus() == TokenStatus.SERVING
                )
                .count();

        DashboardStatsDTO stats = new DashboardStatsDTO(
                totalDoctors,
                totalSlots,
                totalTokens,
                activityTokens
        );
        return ResponseEntity.ok(stats);
    }
}

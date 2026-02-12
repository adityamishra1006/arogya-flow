package com.arogya.flow.controller;

import com.arogya.flow.dto.SlotAvailabilityDTO;
import com.arogya.flow.dto.SlotCreateRequestDTO;
import com.arogya.flow.dto.SlotDTO;
import com.arogya.flow.service.SlotService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/slots")
@RequiredArgsConstructor
public class SlotController {
    private final SlotService slotService;

    @PostMapping("/doctors/{doctorId}")
    public ResponseEntity<List<SlotAvailabilityDTO>> createSlots(
            @PathVariable Long doctorId,
            @RequestBody SlotCreateRequestDTO request
    ) {
        List<SlotAvailabilityDTO> response = slotService.createSlots(doctorId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<SlotAvailabilityDTO>> getSlotsByDoctorAndDate(
            @PathVariable Long doctorId,
            @RequestParam LocalDate date
    ) {
        return ResponseEntity.ok(slotService.getSlotByDoctorAndDate(doctorId, date));
    }
}

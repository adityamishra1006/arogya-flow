package com.arogya.flow.controller;

import com.arogya.flow.dto.SlotCreateRequestDTO;
import com.arogya.flow.dto.SlotDTO;
import com.arogya.flow.service.SlotService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/slots")
@RequiredArgsConstructor
public class SlotController {
    private final SlotService slotService;

    @PostMapping("/doctor/{doctorId}")
    public ResponseEntity<List<SlotDTO>> createSlot(
            @PathVariable Long doctorId,
            @RequestBody SlotCreateRequestDTO request
    ){
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(slotService.createSlots(doctorId, request));
    }
}

package com.arogya.flow.controller;

import com.arogya.flow.dto.AppointmentDTO;
import com.arogya.flow.dto.SlotBookingRequestDTO;
import com.arogya.flow.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/appointment")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    @PostMapping("/book")
    public ResponseEntity<AppointmentDTO> bookSlot(@RequestBody SlotBookingRequestDTO request){
        return ResponseEntity.ok(appointmentService.bookSlot(request));
    }

}

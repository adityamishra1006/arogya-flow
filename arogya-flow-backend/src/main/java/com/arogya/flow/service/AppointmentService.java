package com.arogya.flow.service;

import com.arogya.flow.dto.AppointmentDTO;
import com.arogya.flow.dto.SlotBookingRequestDTO;
import com.arogya.flow.entity.Appointment;
import com.arogya.flow.entity.Slot;
import com.arogya.flow.entity.enums.SlotStatus;
import com.arogya.flow.exception.ResourceNotFoundException;
import com.arogya.flow.repository.AppointmentRepository;
import com.arogya.flow.repository.SlotRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

@Service
@RequiredArgsConstructor
public class AppointmentService {
    private final SlotRepository slotRepository;
    private final AppointmentRepository appointmentRepository;
    private final SlotService slotService;

    @Transactional
    public AppointmentDTO bookSlot(SlotBookingRequestDTO request){
        Slot slot = slotRepository.findById(request.getSlotId())
                .orElseThrow(()->
                            new ResourceNotFoundException("Slot Not Found")
                        );

        if(slot.getStatus() != SlotStatus.OPEN){
            throw new IllegalStateException("Slot is already booked or closed");
        }

        Appointment appointment = Appointment.builder()
                .patientName(request.getPatientName())
                .email(request.getEmail())
                .build();

        appointment.setSlot(slot);
        slot.setAppointment(appointment);
        slot.setStatus(SlotStatus.BOOKED);

        Appointment saved = appointmentRepository.save(appointment);

        slotRepository.save(slot);

        return new AppointmentDTO(
                saved.getId(),
                saved.getPatientName(),
                saved.getEmail(),
                slot.getId()
        );
    }
}

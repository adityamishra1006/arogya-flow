package com.arogya.flow.service;

import com.arogya.flow.dto.SlotCreateRequestDTO;
import com.arogya.flow.dto.SlotDTO;
import com.arogya.flow.entity.Doctor;
import com.arogya.flow.entity.Slot;
import com.arogya.flow.entity.enums.SlotStatus;
import com.arogya.flow.exception.ResourceNotFoundException;
import com.arogya.flow.repository.DoctorRepository;
import com.arogya.flow.repository.SlotRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SlotService{
    private final SlotRepository slotRepository;
    private final DoctorRepository doctorRepository;


    @Transactional
    public List<SlotDTO> createSlots(Long doctorId, SlotCreateRequestDTO request) {

        // 1️⃣ Fetch doctor
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Doctor not found with id: " + doctorId)
                );

        // 2️⃣ Validate request
        validateRequest(request);

        // 3️⃣ Prevent overlapping OPD sessions
        boolean overlapExists =
                slotRepository.existsByDoctorIdAndSlotDateAndStartTimeLessThanAndEndTimeGreaterThan(
                        doctorId,
                        request.getSlotDate(),
                        request.getEndTime(),
                        request.getStartTime()
                );

        if (overlapExists) {
            throw new IllegalStateException(
                    "Slot timing overlaps with an existing OPD session"
            );
        }

        // 4️⃣ Generate slots
        LocalTime currentStart = request.getStartTime();
        LocalTime endTime = request.getEndTime();
        int duration = request.getSlotDurationInMinutes();

        List<Slot> slotsToSave = new ArrayList<>();

        while (currentStart.plusMinutes(duration).compareTo(endTime) <= 0) {

            LocalTime currentEnd = currentStart.plusMinutes(duration);

            Slot slot = new Slot();
            slot.setDoctor(doctor);
            slot.setSlotDate(request.getSlotDate());
            slot.setStartTime(currentStart);
            slot.setEndTime(currentEnd);
            slot.setMaxToken(doctor.getMaxTokenPerSlot());
            slot.setCurrentTokenCount(0);
            slot.setStatus(SlotStatus.OPEN);

            slotsToSave.add(slot);
            currentStart = currentEnd;
        }

        // 5️⃣ Save slots
        List<Slot> savedSlots = slotRepository.saveAll(slotsToSave);

        // 6️⃣ Convert to DTO
        List<SlotDTO> response = new ArrayList<>();
        for (Slot slot : savedSlots) {
            response.add(new SlotDTO(
                    slot.getId(),
                    slot.getSlotDate(),
                    slot.getStartTime(),
                    slot.getEndTime(),
                    slot.getStatus()
            ));
        }

        return response;
    }


    private void validateRequest(SlotCreateRequestDTO request) {

        if (request.getSlotDate() == null) {
            throw new IllegalArgumentException("Slot date is required");
        }

        if (request.getStartTime() == null || request.getEndTime() == null) {
            throw new IllegalArgumentException("Start time and end time are required");
        }

        if (!request.getStartTime().isBefore(request.getEndTime())) {
            throw new IllegalArgumentException("Start time must be before end time");
        }

        if (request.getSlotDurationInMinutes() == null ||
                request.getSlotDurationInMinutes() <= 0) {
            throw new IllegalArgumentException("Slot duration must be greater than 0");
        }
    }
}
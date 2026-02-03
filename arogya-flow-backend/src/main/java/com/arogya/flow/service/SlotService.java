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

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SlotService{
    private final SlotRepository slotRepository;
    private final DoctorService doctorService;


    @Transactional
    public List<SlotDTO> createSlots(Long doctorId, SlotCreateRequestDTO request) {

        Doctor doctor = doctorService.getDoctorEntity(doctorId);

        validateRequest(request);

        boolean overlapExist = slotRepository.existsByDoctorIdAndSlotDateAndStartTimeLessThanAndEndTimeGreaterThan(
                doctorId,
                request.getSlotDate(),
                request.getStartTime(),
                request.getEndTime()
        );

        if(overlapExist){
            throw new IllegalArgumentException("Slot overlaps with another slot");
        }

        LocalTime currentStart = request.getStartTime();
        LocalTime endTime = request.getEndTime();
        int duration = request.getSlotDurationInMinutes();

        List<Slot> slotsToSave = new ArrayList<>();

        while(currentStart.plusMinutes(duration).compareTo(endTime) <= 0){
            Slot slot = new Slot();
            slot.setDoctor(doctor);
            slot.setSlotDate(request.getSlotDate());
            slot.setStartTime(currentStart);
            slot.setEndTime(currentStart.plusMinutes(duration));
            slot.setMaxToken(doctor.getMaxTokenPerSlot());
            slot.setCurrentTokenCount(0);
            slot.setStatus(SlotStatus.OPEN);

            slotsToSave.add(slot);
            currentStart = currentStart.plusMinutes(duration);
        }

        return slotRepository.saveAll(slotsToSave)
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    public List<SlotDTO> getSlotByDoctorAndDate(Long doctorId, LocalDate date){
        List<Slot> slots = slotRepository.findByDoctorIdAndSlotDateOrderByStartTime(
                doctorId,
                date
        );

        return slots.stream()
                .map(this::mapToDTO)
                .toList();
    }

    @Transactional
    public void closedExpiredSlots(){
        LocalDate today = LocalDate.now();
        LocalTime now = LocalTime.now();

        List<Slot> expiredTime = slotRepository.findByStatusAndSlotDateAndEndTimeBefore(
                SlotStatus.OPEN,
                today,
                now
        );

        for(Slot slot : expiredTime){
            slot.setStatus(SlotStatus.CLOSED);
        }
        slotRepository.saveAll(expiredTime);
    }

    @Transactional
    public void deleteOldCompletedSlots(){
        LocalDate cutOffDate = LocalDate.now().minusDays(1);

        List<Slot> oldSlots = slotRepository.findByStatusAndSlotDateBefore(
                SlotStatus.CLOSED,
                cutOffDate
        );
        slotRepository.deleteAll(oldSlots);
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

    private SlotDTO mapToDTO(Slot slot) {
        return new SlotDTO(
                slot.getId(),
                slot.getSlotDate(),
                slot.getStartTime(),
                slot.getEndTime(),
                slot.getStatus()
        );
    }
}
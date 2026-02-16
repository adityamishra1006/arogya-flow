package com.arogya.flow.service;

import com.arogya.flow.dto.SlotAvailabilityDTO;
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
import org.springframework.scheduling.annotation.Scheduled;
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
    public List<SlotAvailabilityDTO> createSlots(Long doctorId, SlotCreateRequestDTO request) {

        Doctor doctor = doctorService.getDoctorEntity(doctorId);
        validateRequest(request);

        if (request.getSlotDate().isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("Cannot create slots for past date");
        }

        if (doctor.getMaxTokenPerSlot() == null || doctor.getMaxTokenPerSlot() <= 0) {
            throw new IllegalArgumentException("Doctor maxTokenPerSlot invalid");
        }

        List<Slot> slotsToSave = new ArrayList<>();
        LocalTime currentStart = request.getStartTime();
        int duration = request.getSlotDurationInMinutes();

        while (!currentStart.plusMinutes(duration).isAfter(request.getEndTime())) {

            LocalTime slotEnd = currentStart.plusMinutes(duration);

            boolean overlapExist =
                    slotRepository.existsByDoctorIdAndSlotDateAndStartTimeLessThanAndEndTimeGreaterThan(
                            doctorId,
                            request.getSlotDate(),
                            slotEnd,
                            currentStart
                    );

            if (overlapExist) {
                throw new IllegalArgumentException(
                        "Slot overlaps at " + currentStart + " - " + slotEnd
                );
            }

            Slot slot = new Slot();
            slot.setDoctor(doctor);
            slot.setSlotDate(request.getSlotDate());
            slot.setStartTime(currentStart);
            slot.setEndTime(slotEnd);
            slot.setMaxToken(doctor.getMaxTokenPerSlot());
            slot.setCurrentTokenCount(0);
            slot.setStatus(SlotStatus.OPEN);

            slotsToSave.add(slot);
            currentStart = slotEnd;
        }

        return slotRepository.saveAll(slotsToSave)
                .stream()
                .map(this::mapToAvailabilityDTO)
                .toList();
    }


    public List<SlotAvailabilityDTO> getSlotByDoctorAndDate(Long doctorId, LocalDate date){
        List<Slot> slots = slotRepository.findByDoctorIdAndSlotDateOrderByStartTime(
                doctorId,
                date
        );

        return slots.stream()
                .map(this::mapToAvailabilityDTO)
                .toList();
    }

    @Scheduled(fixedRate = 60000)
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

    public void resetDailySlots(){
        LocalDate today = LocalDate.now();
        List<Slot> oldSlots = slotRepository.findBySlotDateBefore(today);
        slotRepository.deleteAll(oldSlots);
        System.out.println("Daily slots reset successfully");
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

    private SlotAvailabilityDTO mapToAvailabilityDTO(Slot slot) {
        int remaining = Math.max(
                slot.getMaxToken() - slot.getCurrentTokenCount(),
                0
        );

        String patientName = null;

        if(slot.getStatus() == SlotStatus.BOOKED && slot.getAppointment() != null){
            patientName = slot.getAppointment().getPatientName();
        }

        return new SlotAvailabilityDTO(
                slot.getId(),
                slot.getSlotDate(),
                slot.getStartTime(),
                slot.getEndTime(),
                slot.getStatus(),
                slot.getMaxToken(),
                remaining,
                patientName
        );
    }
}
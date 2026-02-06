package com.arogya.flow.service;

import com.arogya.flow.entity.Slot;
import com.arogya.flow.entity.Token;
import com.arogya.flow.entity.enums.SlotStatus;
import com.arogya.flow.entity.enums.TokenSource;
import com.arogya.flow.entity.enums.TokenStatus;
import com.arogya.flow.exception.ResourceNotFoundException;
import com.arogya.flow.repository.SlotRepository;
import com.arogya.flow.repository.TokenRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SimulationService {
    private final SlotRepository slotRepository;
    private final TokenRepository tokenRepository;
    private final AllocationEngine allocationEngine;

    @Transactional
    public void simulateDelay(Long slotId, int delayMinutes){
        Slot slot = slotRepository.findById(slotId)
                .orElseThrow(() ->
                    new ResourceNotFoundException("Slot not ound with id: " + slotId)
                );
        slot.setEndTime(slot.getEndTime().plusMinutes(delayMinutes));
        slotRepository.save(slot);
    }

    @Transactional
    public Token triggerEmergency(Long slotId){
        Slot slot = slotRepository.findById(slotId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Slot not found with id: " + slotId)
                );

        allocationEngine.validateAllocation(slot, TokenSource.EMERGENCY);

        Token token = Token.builder()
                .tokenNumber("EMG-" + System.currentTimeMillis())
                .slot(slot)
                .source(TokenSource.EMERGENCY)
                .status(TokenStatus.CREATED)
                .priority(1)
                .build();

        tokenRepository.save(token);

        allocationEngine.updateSlotAfterAllocation(slot, TokenSource.EMERGENCY);
        slotRepository.save(slot);

        return token;
    }

    @Transactional
    public void resetSimulation(){
        tokenRepository.deleteAll();
        List<Slot> slots = slotRepository.findAll();

        for(Slot slot : slots){
            slot.setCurrentTokenCount(0);
            slot.setStatus(SlotStatus.OPEN);
        }
        slotRepository.saveAll(slots);
    }

    @Transactional
    public void closeExpiredSlots(){
        LocalDate today = LocalDate.now();
        LocalTime now = LocalTime.now();

        List<Slot> expiredSlots = slotRepository
                .findByStatusAndSlotDateAndEndTimeBefore(
                        SlotStatus.OPEN,
                        today,
                        now
                );

        for(Slot slot : expiredSlots){
            slot.setStatus(SlotStatus.CLOSED);
        }
        slotRepository.saveAll(expiredSlots);
    }
}

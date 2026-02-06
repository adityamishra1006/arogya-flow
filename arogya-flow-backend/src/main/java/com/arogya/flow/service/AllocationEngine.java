package com.arogya.flow.service;

import com.arogya.flow.entity.Slot;
import com.arogya.flow.entity.Token;
import com.arogya.flow.entity.enums.SlotStatus;
import com.arogya.flow.entity.enums.TokenSource;
import com.arogya.flow.entity.enums.TokenStatus;
import com.arogya.flow.exception.SlotFullException;
import com.arogya.flow.repository.TokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Comparator;
import java.util.List;

@Component
@RequiredArgsConstructor
public class AllocationEngine {
    private final TokenRepository tokenRepository;

    public void validateAllocation(Slot slot, TokenSource source){
        if(slot.getStatus() == SlotStatus.CLOSED){
            throw new SlotFullException("Slot is closed");
        }

        if(slot.getCurrentTokenCount() >= slot.getMaxToken() && source != TokenSource.EMERGENCY){
            throw new SlotFullException("Slot is full");
        }
    }

    public void updateSlotAfterAllocation(Slot slot, TokenSource source){
        if(source != TokenSource.EMERGENCY){
            slot.setCurrentTokenCount(slot.getCurrentTokenCount() + 1);
        }

        if(slot.getCurrentTokenCount() >= slot.getMaxToken()){
            slot.setStatus(SlotStatus.FULL);
        }
    }

    public int claculateQueuePosition(Token currentToken){
        List<Token> activeToken = tokenRepository.findBySlotIdAndStatus(
                currentToken.getSlot().getId(),
                TokenStatus.CREATED
        );
        activeToken.sort(
                Comparator
                        .comparingInt(Token::getPriority)
                        .thenComparing(Token::getCreatedAt)
        );

        for(int i = 0; i<activeToken.size(); i++){
            if(activeToken.get(i).getId().equals(currentToken.getId())){
                return i+1;
            }
        }
        return activeToken.size();
    }
    public void releaseSlot(Slot slot){
        slot.setCurrentTokenCount(
                Math.max(slot.getCurrentTokenCount() - 1, 0)
        );
        if(slot.getStatus() == SlotStatus.FULL){
            slot.setStatus(SlotStatus.OPEN);
        }
    }
}

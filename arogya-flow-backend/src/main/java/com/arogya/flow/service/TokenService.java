package com.arogya.flow.service;

import com.arogya.flow.dto.TokenRequestDTO;
import com.arogya.flow.dto.TokenResponseDTO;
import com.arogya.flow.entity.Slot;
import com.arogya.flow.entity.Token;
import com.arogya.flow.entity.enums.SlotStatus;
import com.arogya.flow.entity.enums.TokenSource;
import com.arogya.flow.entity.enums.TokenStatus;
import com.arogya.flow.exception.ResourceNotFoundException;
import com.arogya.flow.exception.SlotFullException;
import com.arogya.flow.repository.SlotRepository;
import com.arogya.flow.repository.TokenRepository;
import com.arogya.flow.utils.PriorityUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TokenService {
    private final SlotRepository slotRepository;
    private final TokenRepository tokenRepository;

    @Transactional
    public TokenResponseDTO bookToken(TokenRequestDTO requestDTO) {
        Slot slot = slotRepository.findById(requestDTO.getSlotId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Slot not found with id : " + requestDTO.getSlotId()
                        )
                );

        if(slot.getStatus() == SlotStatus.CLOSED){
            throw new SlotFullException("Slot is already closed");
        }

        if(slot.getCurrentTokenCount() >= slot.getMaxToken() && requestDTO.getSource() != TokenSource.EMERGENCY){
            throw new SlotFullException("Slot is full");
        }

        int priority = PriorityUtils.calculatePriority(requestDTO.getSource());
        String tokenNumber = generateTokenNumber(slot.getId());
        Token token = Token.builder()
                .tokenNumber(tokenNumber)
                .slot(slot)
                .source(requestDTO.getSource())
                .status(TokenStatus.CREATED)
                .priority(priority)
                .build();

        tokenRepository.save(token);

        if(requestDTO.getSource() == TokenSource.EMERGENCY){
            slot.setCurrentTokenCount(slot.getCurrentTokenCount() + 1);
        }

        if(slot.getCurrentTokenCount() >= slot.getMaxToken()){
            slot.setStatus(SlotStatus.FULL);
        }

        slotRepository.save(slot);

        int queuePosition = calculateQueuePriorityPosition(token);

        return new TokenResponseDTO(
                token.getTokenNumber(),
                token.getStatus(),
                queuePosition
        );
    }

    @Transactional
    public void cancelToken(Long tokenId) {
        Token token = tokenRepository.findById(tokenId)
                .orElseThrow(() ->
                    new ResourceNotFoundException("Token not found with id : " + tokenId)
                );
        token.setStatus(TokenStatus.CANCELLED);
        tokenRepository.save(token);

        Slot slot = token.getSlot();
        slot.setCurrentTokenCount(
                Math.max(slot.getCurrentTokenCount() - 1, 0)
        );
        slot.setStatus(SlotStatus.OPEN);
        slotRepository.save(slot);
    }

    @Transactional
    public void expireToken(Long tokenId) {
        Token token = tokenRepository.findById(tokenId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Token not found with id : " + tokenId)
                );
        token.setStatus(TokenStatus.EXPIRED);
        tokenRepository.save(token);

        Slot slot = token.getSlot();
        slot.setCurrentTokenCount(
                Math.max(slot.getCurrentTokenCount() - 1, 0)
        );
        slot.setStatus(SlotStatus.OPEN);
        slotRepository.save(slot);
    }

    private String generateTokenNumber(Long slotId) {
        String tokenNumber;
        do{
            tokenNumber = "T-"+slotId+"-"+(int)(Math.random()*1000);
        }while (tokenRepository.existsByTokenNumber(tokenNumber));
        return tokenNumber;
    }

    private int calculateQueuePriorityPosition(Token currentToken) {
        List<Token> activeTokens = tokenRepository.findBySlotIdAndStatus(
                currentToken.getSlot().getId(),
                TokenStatus.CREATED
        );

        activeTokens.sort(
                Comparator
                        .comparingInt(Token::getPriority)
                        .thenComparing(Token::getCreatedAt)
        );
        for (int i = 0; i< activeTokens.size(); i++){
            if(activeTokens.get(i).getId().equals(currentToken.getId())){
                return i+1;
            }
        }
        return activeTokens.size();
    }
}

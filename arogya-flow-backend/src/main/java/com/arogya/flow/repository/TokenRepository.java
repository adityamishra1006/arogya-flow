package com.arogya.flow.repository;

import com.arogya.flow.entity.Token;
import com.arogya.flow.entity.enums.TokenStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TokenRepository extends JpaRepository<Token, Long> {
    List<Token> findBySlotIdAndStatus(Long slotId, TokenStatus status);
    boolean existsByTokenNumber(String tokenNumber);
}

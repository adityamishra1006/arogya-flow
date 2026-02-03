package com.arogya.flow.entity;

import com.arogya.flow.entity.enums.TokenSource;
import com.arogya.flow.entity.enums.TokenStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "tokens",
        indexes = {
                @Index(name = "idx_token_number", columnList = "tokenNumber"),
                @Index(name = "idx_slot_status", columnList = "status"),
                @Index(name = "idx_slot_id", columnList = "slot_id")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Token {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false, unique = true)
    private String tokenNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "slot_id", nullable = false)
    private Slot slot;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TokenSource source;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TokenStatus status;

    @Column(nullable = false)
    private Integer priority;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void onCreate(){
        this.createdAt = LocalDateTime.now();
    }
}

package com.arogya.flow.entity;

import com.arogya.flow.entity.enums.SlotStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Entity
@Table(name = "slots")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Slot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

    @Column(name = "slot_date", nullable = false)
    private LocalDate slotDate;

    @Column(name = "start_time", nullable = false)
    private LocalTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalTime endTime;

    @Column(name = "max_token", nullable = false)
    private Integer maxToken;

    @Column(name = "current_token_count",nullable = false)
    private Integer currentTokenCount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SlotStatus status;
}

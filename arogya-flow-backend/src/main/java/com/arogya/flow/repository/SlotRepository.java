package com.arogya.flow.repository;

import com.arogya.flow.entity.Slot;
import com.arogya.flow.entity.enums.SlotStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface SlotRepository extends JpaRepository<Slot, Long> {

    List<Slot> findByDoctorIdAndSlotDateOrderByStartTime(
            Long doctorId,
            LocalDate slotDate
    );

    List<Slot> findByStatusAndSlotDateAndEndTimeBefore(
            SlotStatus status,
            LocalDate date,
            LocalTime time
    );

    List<Slot> findByStatusAndSlotDateBefore(
            SlotStatus status,
            LocalDate date
    );

    boolean existsByDoctorIdAndSlotDateAndStartTimeLessThanAndEndTimeGreaterThan(
            Long doctorId,
            LocalDate slotDate,
            LocalTime endTime,
            LocalTime startTime
    );

    List<Slot> findBySlotDateBefore(LocalDate today);

    long countByStatus(SlotStatus slotStatus);

    long countBySlotDate(LocalDate slotDate);

    long countBySlotDateAndStatus(LocalDate slotDate, SlotStatus status);

    Optional<Slot> findFirstBySlotDateAndStatusAndStartTimeAfterOrderByStartTimeAsc(
            LocalDate slotDate,
            SlotStatus status,
            LocalTime time
    );
}

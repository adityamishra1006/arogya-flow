package com.arogya.flow.repository;

import com.arogya.flow.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    @Query("""
        SELECT COUNT(a)
        FROM Appointment a
        WHERE 
            a.slot.slotDate > :today
            OR (a.slot.slotDate = :today AND a.slot.endTime > :now)
    """)
    long countUpcomingAppointments(
            @Param("today") LocalDate today,
            @Param("now") LocalTime now
    );
}

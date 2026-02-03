package com.arogya.flow.service;

import com.arogya.flow.dto.DoctorDTO;
import com.arogya.flow.entity.Doctor;
import com.arogya.flow.exception.ResourceNotFoundException;
import com.arogya.flow.repository.DoctorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DoctorService {

    private final DoctorRepository doctorRepository;

    public DoctorDTO createDoctor(DoctorDTO doctorDTO){
        Doctor doctor = new Doctor();
        doctor.setName(doctorDTO.getName());
        doctor.setSpecialization(doctorDTO.getSpecialization());
        doctor.setMaxTokenPerSlot(doctorDTO.getMaxTokensPerSlot());

        Doctor savedDoctor = doctorRepository.save(doctor);

        return new DoctorDTO(
                savedDoctor.getId(),
                savedDoctor.getName(),
                savedDoctor.getSpecialization(),
                savedDoctor.getMaxTokenPerSlot()
        );
    }

    public List<DoctorDTO> getAllDoctors(){
        return doctorRepository.findAll()
                .stream()
                .map(doctor -> new DoctorDTO(
                        doctor.getId(),
                        doctor.getName(),
                        doctor.getSpecialization(),
                        doctor.getMaxTokenPerSlot()
                ))
                .collect(Collectors.toList());
    }

    public DoctorDTO getDoctorById(Long id){
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Doctor not found with id : "+ id)
                );

        return new DoctorDTO(
                doctor.getId(),
                doctor.getName(),
                doctor.getSpecialization(),
                doctor.getMaxTokenPerSlot()
        );
    }

    public Doctor getDoctorEntity(Long id) {
        return doctorRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Doctor not found with id : " + id
                        )
                );
    }


}

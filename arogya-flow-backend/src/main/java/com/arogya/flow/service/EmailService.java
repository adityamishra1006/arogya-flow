package com.arogya.flow.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;

    public void sendBookingConfirmation(String toEmail, String patientName, String slotTime){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Appointment Confirmation - Arogya Flow");
        message.setText(
                "Dear" + patientName + ",\n\n"+
                        "Your appointment has been successfully booked.\n"+
                        "Slot Time: " + slotTime + "\n\n"+
                        "Thank you for choosing Arogya Flow. \n\n" +
                        "Regards, \nArogya Flow Team"
        );
        mailSender.send(message);
    }
}

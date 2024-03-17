package com.example.taskmanager.mailVerification;

import com.example.taskmanager.user.User;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.UUID;

@RequiredArgsConstructor
@Service
public class VerificationService {
    private final JavaMailSender mailSender;

    public String verificationToken() {
        return UUID.randomUUID().toString();
    }


    public void sendVerificationEmail(User user, String verificationToken) {
        String subject = "Verify your account";
        String verificationUrl = "http://localhost:3000/verify?token=" + verificationToken;
        String message = "<p>Hello, " + user.getFirstname() +
                "</p><p>Click on the link below to verify your account:</p>" +
                "<p><a href='" + verificationUrl + "'>" + verificationUrl + "</a></p>";

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
        try {
            helper.setTo(user.getEmail());
            helper.setSubject(subject);
            helper.setText(message, true);
        } catch (MessagingException e) {
            throw new IllegalArgumentException("Failed to send email for: " + user.getEmail());
        }

        mailSender.send(mimeMessage);
    }
}

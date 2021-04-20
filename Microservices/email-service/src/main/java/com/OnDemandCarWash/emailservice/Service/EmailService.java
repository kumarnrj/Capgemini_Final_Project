package com.OnDemandCarWash.emailservice.Service;

import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

@Service
public class EmailService {

    public boolean sendEmail(String to, String msg, String subject, String from)  {


        // variable for gmail host
        String host = "smtp.gmail.com";

        // get the system properties
        Properties properties = System.getProperties();

        //setting important information to propeties object
        properties.put("mail.smtp.host", host);
        properties.put("mail.smtp.port", "465");
        properties.put("mail.smtp.ssl.enable", "true");
        properties.put("mail.smtp.auth", "true");

        //step 1: to get the session object
        Session session = Session.getInstance(properties, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication("neeraj.neerajkumar425@gmail.com", "neerajkumar123");
            }
        });

        try {
            // step 2: compose the message
            MimeMessage message = new MimeMessage(session);

            //from email id
            message.setFrom(from);

            //adding recipient to message
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));

            //adding subject to message
            message.setSubject(subject);

            //adding text to message
            message.setText(msg);

            //send
            //Step 3. send the message using transpost class
            Transport.send(message);
            //System.out.println("Message send succesfully");
            return true;

        } catch (Exception e) {
            e.printStackTrace();
            return  false;
        }
    }
}

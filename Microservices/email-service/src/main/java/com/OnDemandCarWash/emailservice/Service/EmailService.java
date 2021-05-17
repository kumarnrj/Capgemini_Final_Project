package com.OnDemandCarWash.emailservice.Service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

@Service
public class EmailService {

    // variable for gmail host
    @Value("${email.host}")
    private String host;

    // important properties
    @Value("${smtp.port}")
    private  String port;

    @Value("${smtp.ssl.enable}")
    private  String sslEnable;

    @Value("${smtp.auth}")
    private String auth;

    @Value("${sender.email}")
    private String email;

    @Value("${sender.password}")
    private String password;


    public boolean sendEmail(String to, String msg, String subject, String from)  {


        // get the system properties
        Properties properties = System.getProperties();

        //setting important information to propeties object
        properties.put("mail.smtp.host", host);
        properties.put("mail.smtp.port", port);
        properties.put("mail.smtp.ssl.enable", sslEnable);
        properties.put("mail.smtp.auth", auth);

        //step 1: to get the session object
        Session session = Session.getInstance(properties, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(email, password);
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

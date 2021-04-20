package com.OnDemandCarWash.emailservice.EmailController;

import com.OnDemandCarWash.emailservice.Model.SendOtpResponse;
import com.OnDemandCarWash.emailservice.Model.UserSession;
import com.OnDemandCarWash.emailservice.RabbitMqConfig.RabbitMqConfig;
import com.OnDemandCarWash.emailservice.Service.EmailService;
import com.OnDemandCarWash.emailservice.Service.SessionReciever;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.util.JSONPObject;
import org.apache.tomcat.util.http.parser.MediaType;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.Map;
import java.util.Random;

@CrossOrigin
@RestController
public class EmailController {

    private int SystemGenOtp=0;

    Random random= new Random(100000000);

    @Autowired
    EmailService emailService;

    @Autowired
    AmqpTemplate template;





    @GetMapping("/sendEmail")
    public boolean sentEmail(){
        String msg = "this is for testing api";
        String subject = "tesing api";
        String to = "neeraj.neerajkumar11@gmail.com";
        String from = "neeraj.neerajkumar425@gmail.com";
        return emailService.sendEmail(to,msg,subject,from);
    }

    @PostMapping(path = "/sendOtp")
    public ResponseEntity<?> sentOtpToUser(@RequestBody Map<String,Object> request) throws JSONException {

        int otp = random.nextInt(999999);
        System.out.println(otp);
        String msg = "Your otp for varification "+otp;
        String subject = "Account verification Otp";
        String to = request.get("email").toString();
        String from = "neeraj.neerajkumar425@gmail.com";

        boolean flag = emailService.sendEmail(to,msg,subject,from);

        if(flag){
            UserSession userSession = new UserSession(to,otp);
            template.convertAndSend(RabbitMqConfig.EXCHANGE,RabbitMqConfig.ROUTING_KEY,userSession);

            System.out.println("Otp has been sent");
            return  ResponseEntity.ok().body(new SendOtpResponse("Otp has been sent to your email id"));

        }else{
            return ResponseEntity.badRequest().body(new SendOtpResponse("Server Error"));
        }

    }

    @PostMapping("/verify-otp")
    public  ResponseEntity<?>verfityOtp(@RequestBody Map<String,Object> request){
        int UserEnteredOtp = Integer.parseInt(request.get("otp").toString());
        boolean isValidOtp =false;
        try{
            UserSession userSession = (UserSession) template.receiveAndConvert(RabbitMqConfig.QUEUE);

            SystemGenOtp = userSession.getOtp();
            if(SystemGenOtp==UserEnteredOtp){
                isValidOtp=true;
            }
            else
                isValidOtp=false;
        }catch(NullPointerException e){
            if(SystemGenOtp!=0){
                if(SystemGenOtp==UserEnteredOtp){
                   isValidOtp=true;
                }
            }else {
                throw new NullPointerException();
            }
        }

       return isValidOtp?ResponseEntity.ok().body(new SendOtpResponse("Congratulations")):ResponseEntity.badRequest().body(new SendOtpResponse( "Please enter valid otp"));

    }

}

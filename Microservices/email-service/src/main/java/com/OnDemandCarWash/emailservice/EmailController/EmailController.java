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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;
import java.util.Random;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class EmailController {

    private int SystemGenOtp=0;
    private  String SystemStoredEmail;

    Random random= new Random(100000000);

    public static int count=1;

    @Autowired
    EmailService emailService;

    @Autowired
    AmqpTemplate template;


    @Value("${sender.email}")
    private String senderEmail;

    // list of userSession
    private List UserSession;

    @GetMapping("/sendEmail")
    public boolean sentEmail(){
        String msg = "this is for testing api";
        String subject = "tesing api";
        String to = "neeraj.neerajkumar11@gmail.com";
        String from = senderEmail;
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
        String UserEmail = request.get("email").toString();
        boolean isValidOtp =false;
        try{
            while(true){
                UserSession userSession = (UserSession) template.receiveAndConvert(RabbitMqConfig.QUEUE);
                SystemGenOtp = userSession.getOtp();
                SystemStoredEmail = userSession.getEmail();

                if(userSession.getOtp()==UserEnteredOtp && UserEmail.equals(userSession.getEmail())){
                    isValidOtp=true;
                    break;
                }
            }


        }catch(NullPointerException e){
            if(SystemGenOtp!=0){
                if(SystemGenOtp==UserEnteredOtp && UserEmail.equals(SystemStoredEmail)){
                   isValidOtp=true;
                }
            }else {
                throw new NullPointerException();
            }
        }

       return isValidOtp?ResponseEntity.ok().body(new SendOtpResponse("Congratulations")):ResponseEntity.badRequest().body(new SendOtpResponse( "Please enter valid otp"));

    }

}

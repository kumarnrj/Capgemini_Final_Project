package com.OnDemandCarWash.smsservice.Controller;

import com.OnDemandCarWash.smsservice.Model.SmsBody;
import com.OnDemandCarWash.smsservice.Model.SmsResponse;
import com.OnDemandCarWash.smsservice.Service.SmsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class SmsController {

    @Autowired
    SmsService smsService;

    @PostMapping("/order-notification")
    public ResponseEntity<?>Ordernotification(@RequestBody SmsBody smsBody){

        int statusCode = smsService.sendMsg(smsBody);
        if(statusCode==200){
            SmsResponse smsResponse = new SmsResponse();
            smsResponse.setMsg("Message sent succesfully");
            return  ResponseEntity.ok().body(smsResponse);
        }
        else{
            SmsResponse smsResponse = new SmsResponse();
            smsResponse.setMsg(statusCode+"");
            return  ResponseEntity.badRequest().body(smsResponse);
        }

    }
}

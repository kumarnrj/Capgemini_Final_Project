package com.OnDemandCarWash.emailservice.Service;

import com.OnDemandCarWash.emailservice.Model.UserSession;
import com.OnDemandCarWash.emailservice.RabbitMqConfig.RabbitMqConfig;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

//@Component
public class SessionReciever {

    //@RabbitListener(queues = RabbitMqConfig.QUEUE)
    public void otpReciever(UserSession userSession){
        System.out.println(userSession);
    }
}

package com.OnDemandCarWash.emailservice.RabbitMqConfig;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import  com.OnDemandCarWash.emailservice.EmailController.*;

@Configuration
public class RabbitMqConfig {
    public static   String EXCHANGE="session_exchange";
    public static  String QUEUE="session_queue";
    public static   String ROUTING_KEY="session_routingKey";

    @Bean
    public Queue queue(){
        return  new Queue(QUEUE);
    }

    @Bean
    public TopicExchange exchange(){
        return  new TopicExchange(EXCHANGE);
    }

    @Bean
    public Binding binding(Queue queue, TopicExchange exchange){
        return BindingBuilder.bind(queue).to(exchange).with(ROUTING_KEY);
    }

    @Bean
    public MessageConverter converter(){
        return new Jackson2JsonMessageConverter();
    }


    @Bean
    public AmqpTemplate template(ConnectionFactory connectionFactory){

        final RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(converter());
        return rabbitTemplate;
    }
}

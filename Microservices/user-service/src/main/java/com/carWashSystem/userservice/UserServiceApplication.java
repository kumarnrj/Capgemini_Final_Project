package com.carWashSystem.userservice;

import com.carWashSystem.userservice.Repository.UserRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import springfox.documentation.swagger2.annotations.EnableSwagger2;


@EnableSwagger2
@EnableEurekaClient
@SpringBootApplication
@EnableMongoRepositories(basePackageClasses = UserRepository.class)
public class UserServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(UserServiceApplication.class, args);
	}

    @Bean
	public BCryptPasswordEncoder passwordEncoder(){
		return  new BCryptPasswordEncoder();
	}

}

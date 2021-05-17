package com.OnDemandCarWash.carwashgateway.Config;

import com.OnDemandCarWash.carwashgateway.Filters.JwtRequestFilter;
import com.OnDemandCarWash.carwashgateway.Service.MyUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;


@EnableWebSecurity
public class SecurityConfig  extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Autowired
    private MyUserDetailService myuserDetailsService;

    @Override
    @Bean
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(myuserDetailsService);
    }

    //    @Override
//    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//         auth.inMemoryAuthentication().withUser("carwash")
//                 .password("pass").roles("USER")
//                 .and()
//                 .withUser("admin")
//                 .password("admin")
//                 .roles("ADMIN");
//
//
//
//    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

     http.cors().disable();
    http.csrf().disable()
                .authorizeRequests().antMatchers("/authenticate").permitAll()
                 .antMatchers(HttpMethod.OPTIONS,"/**").permitAll()
                .antMatchers("/email-service/api/**").permitAll()
                .antMatchers("/sms-service/api/**").permitAll()
                .antMatchers("/user-service/api/addUser").permitAll()
                .antMatchers("/user-service/api/findByEmail/**").permitAll()
                .antMatchers("/payment-service/admin").hasRole("ADMIN")
                .antMatchers("/user-service/api/allUser").hasRole("ADMIN")
                .antMatchers("/user-service/api/deleteUser/**").hasRole("ADMIN")
                .antMatchers("/booking-service/api/allBooking").hasRole("ADMIN")
                .antMatchers("/review-service/api/allReview").hasRole("ADMIN")
                .antMatchers("/booking-service/api/customer/**").hasAnyRole("ADMIN","USER")
                .antMatchers("/booking-service/api/washer/**").hasAnyRole("ADMIN","WASHER")
                .antMatchers("/review-service/api/washerId/**").hasAnyRole("ADMIN","WASHER")
                .antMatchers("/review-service/api/washerId/**").hasAnyRole("ADMIN","WASHER","USER")
                .antMatchers("/payment-service/**").hasAnyRole("USER","ADMIN","WASHER")
                .antMatchers("/user-service/api/**").hasAnyRole("USER","WASHER","ADMIN")
                .antMatchers("/booking-service/api/**").hasAnyRole("USER","WASHER","ADMIN")
                .antMatchers("/payment-service/api/**").hasAnyRole("USER","WASHER","ADMIN")
                .anyRequest()
                .permitAll()
                .and().
                exceptionHandling()
                .and().sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

    }


//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        http
//                .httpBasic().and()
//                .authorizeRequests()
//                .antMatchers("/payment-service/admin").hasRole("ADMIN")
//                .antMatchers("/payment-service/**").hasAnyRole("USER","ADMIN")
//                .anyRequest()
//                .permitAll()
//                .and().formLogin()
//                .and().logout();
//    }

    @Bean
    public PasswordEncoder passwordEncoder(){

      return NoOpPasswordEncoder.getInstance();
        //return new BCryptPasswordEncoder();
    }
}

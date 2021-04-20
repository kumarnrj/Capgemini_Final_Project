package com.OnDemandCarWash.carwashgateway.Controller;


import com.OnDemandCarWash.carwashgateway.Service.MyUserDetailService;
import com.OnDemandCarWash.carwashgateway.Util.JwtUtil;
import com.OnDemandCarWash.carwashgateway.models.AuthenticationRequest;
import com.OnDemandCarWash.carwashgateway.models.AuthenticationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;


@RestController
public class AuthenticationController {


    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private MyUserDetailService myUserDetailService;

    @Autowired
    private JwtUtil jwtTokenUtil;


    @GetMapping("/currentUser")
    public String getCurrentUser(Principal principal){
        return  principal.getName();
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest ) throws Exception {

        try{
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(),authenticationRequest.getPassword())
            );

        }catch (BadCredentialsException e){
           return  ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }



        final UserDetails userDetails = myUserDetailService.loadUserByUsername(authenticationRequest.getUsername());

        final String jwt= jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthenticationResponse(jwt));



    }
}

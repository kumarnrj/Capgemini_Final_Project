package com.OnDemandCarWash.carwashgateway.Service;

import com.OnDemandCarWash.carwashgateway.Repository.userRepo;
import com.OnDemandCarWash.carwashgateway.models.MyUserDetails;
import com.OnDemandCarWash.carwashgateway.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MyUserDetailService implements UserDetailsService {

   @Autowired
    userRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String email)  {
        System.out.println("inside userService "+email);
       Optional<User> user= userRepo.findByEmail(email);
        System.out.println("User "+user);
       user.orElseThrow(()->new UsernameNotFoundException("Not found "+email));

       return user.map(MyUserDetails::new).get();
    }
}

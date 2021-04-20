package com.OnDemandCarWash.carwashgateway.models;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class MyUserDetails implements UserDetails {

    private  User user;
    private List<GrantedAuthority> authorities;

    public MyUserDetails(User user){
         this.user = user;
         this.authorities = Arrays.stream(user.getRole().split(","))
                 .map(SimpleGrantedAuthority::new)
                 .collect(Collectors.toList());

    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return user.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return user.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
         return user.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {

       return user.isEnabled();
    }
}

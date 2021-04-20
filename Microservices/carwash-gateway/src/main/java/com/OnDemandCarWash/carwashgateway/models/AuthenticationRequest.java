package com.OnDemandCarWash.carwashgateway.models;

public class AuthenticationRequest {
    private String username;
    private String password;

    public String getUsername() {
        return username;
    }

    public AuthenticationRequest(String usernam) { }

    public AuthenticationRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

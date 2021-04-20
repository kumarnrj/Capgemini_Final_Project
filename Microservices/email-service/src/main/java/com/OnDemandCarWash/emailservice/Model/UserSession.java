package com.OnDemandCarWash.emailservice.Model;

public class UserSession {
    private String email;
    private Integer otp;

    public UserSession() {}

    public UserSession(String email, Integer otp) {
        this.email = email;
        this.otp = otp;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getOtp() {
        return otp;
    }

    public void setOtp(Integer otp) {
        this.otp = otp;
    }

    @Override
    public String toString() {
        return "UserSession{" +
                "email='" + email + '\'' +
                ", otp=" + otp +
                '}';
    }
}

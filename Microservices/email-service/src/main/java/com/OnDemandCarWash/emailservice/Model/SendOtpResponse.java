package com.OnDemandCarWash.emailservice.Model;

public class SendOtpResponse {
    private String msg;

    public  SendOtpResponse(){}
    public SendOtpResponse(String msg) {
        this.msg = msg;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}

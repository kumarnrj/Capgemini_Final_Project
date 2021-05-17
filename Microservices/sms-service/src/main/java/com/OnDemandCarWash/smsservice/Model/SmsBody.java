package com.OnDemandCarWash.smsservice.Model;

public class SmsBody {
    private String number;
    private String msg;

    public SmsBody(){}

    public SmsBody(String number, String msg) {
        this.number = number;
        this.msg = msg;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}

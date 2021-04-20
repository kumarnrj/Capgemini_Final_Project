package com.OnDemandCarWash.emailservice.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class NullPointerException extends  RuntimeException {
    public NullPointerException(){
        super("Not found");
    }
}

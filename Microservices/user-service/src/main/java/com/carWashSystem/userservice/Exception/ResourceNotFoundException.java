package com.carWashSystem.userservice.Exception;

public class ResourceNotFoundException extends RuntimeException {
    private static  final long serialVersionUID=1l;

    public ResourceNotFoundException(String message){
        super(message);
    }
}

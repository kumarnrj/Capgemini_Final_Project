package com.OnDemandCarWash.RatingReviewservice.Exception;

public class ResourceNotFoundException extends RuntimeException {
    private static  final long serialVersionUID=1l;

    public ResourceNotFoundException(String message){
        super(message);
    }
}

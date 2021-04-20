package com.OnDemandCarWash.RatingReviewservice.Service;


import com.OnDemandCarWash.RatingReviewservice.Exception.ResourceNotFoundException;
import com.OnDemandCarWash.RatingReviewservice.Repository.reviewRepo;
import com.OnDemandCarWash.RatingReviewservice.model.Booking;
import com.OnDemandCarWash.RatingReviewservice.model.ReviewRating;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private reviewRepo  reviewRepo;

    @Autowired
    private RestTemplate restTemplate;

    public List<ReviewRating> getAllReviews(){
        return  reviewRepo.findAll();
    }

    public ReviewRating addReview(ReviewRating reviewRating){
        ResponseEntity<List<Booking>> rateResponse =
                restTemplate.exchange("http://localhost:8082/customer/"+reviewRating.getCustomerId(),
                        HttpMethod.GET, null, new ParameterizedTypeReference<List<Booking>>() {
                        });
        List<Booking> bookings = rateResponse.getBody();

        for(Booking booking:bookings){
            if(booking.getWasherId()!=null){
                reviewRating.setWasherId(booking.getWasherId());
                break;
            }
        }
        System.out.println(reviewRating);
        return  reviewRepo.save(reviewRating);
    }

    public List<ReviewRating> getWasherReviews(String washerId) {
        return reviewRepo.findByWasherId(washerId);
    }
}

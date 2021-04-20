package com.OnDemandCarWash.RatingReviewservice.Controller;


import com.OnDemandCarWash.RatingReviewservice.Exception.ResourceNotFoundException;
import com.OnDemandCarWash.RatingReviewservice.Service.ReviewService;
import com.OnDemandCarWash.RatingReviewservice.model.ReviewRating;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class RatingController {

    @Autowired
    private ReviewService reviewService;




    @GetMapping("/allReview")
    public ResponseEntity<?> getAllReview(){

        List<ReviewRating> reviewRatingList= reviewService.getAllReviews();

        if(reviewRatingList.isEmpty()){
            throw  new ResourceNotFoundException("No Review are present");
        }
        else{
            return ResponseEntity.ok(reviewRatingList);
        }

    }

    @GetMapping("/washerId/{washerId}")
    public ResponseEntity<?> getWasherReview(@PathVariable String washerId){

        List<ReviewRating> reviewRatingList = reviewService.getWasherReviews(washerId);
        if(reviewRatingList.isEmpty()){
            throw  new ResourceNotFoundException("Reviews with id: "+ washerId+" not found");
        }
        else{
            return ResponseEntity.ok(reviewRatingList);
        }

    }


    @PostMapping("/add")
   public  ReviewRating addReviews(@RequestBody ReviewRating reviewRating){
        return reviewService.addReview(reviewRating);
    }

}

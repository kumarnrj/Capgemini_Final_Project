package com.OnDemandCarWash.RatingReviewservice.Repository;

import com.OnDemandCarWash.RatingReviewservice.model.ReviewRating;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface reviewRepo extends MongoRepository<ReviewRating,String> {
    List<ReviewRating> findByWasherId(String washerId);
}

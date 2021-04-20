package com.OnDemandCarWash.carwashgateway.Repository;

import com.OnDemandCarWash.carwashgateway.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface userRepo extends MongoRepository<User,String> {
    Optional<User> findByEmail(String email);
}

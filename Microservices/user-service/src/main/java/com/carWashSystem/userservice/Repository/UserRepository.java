package com.carWashSystem.userservice.Repository;

import com.carWashSystem.userservice.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User,String> {

    Optional<User> findBy_id(String Id);
    Optional<User> findByEmail(String email);

}

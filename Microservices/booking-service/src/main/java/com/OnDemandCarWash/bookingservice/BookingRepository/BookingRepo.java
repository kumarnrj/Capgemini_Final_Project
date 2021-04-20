package com.OnDemandCarWash.bookingservice.BookingRepository;

import com.OnDemandCarWash.bookingservice.BookingModel.Booking;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepo extends MongoRepository<Booking,String> {
    List<Booking> findByCustomerId(String customerId);
    List<Booking> findByWasherId(String washerId);
}

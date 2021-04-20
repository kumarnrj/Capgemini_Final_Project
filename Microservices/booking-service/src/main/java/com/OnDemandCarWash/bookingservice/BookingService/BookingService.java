package com.OnDemandCarWash.bookingservice.BookingService;


import com.OnDemandCarWash.bookingservice.BookingModel.Address;
import com.OnDemandCarWash.bookingservice.BookingModel.Booking;
import com.OnDemandCarWash.bookingservice.BookingRepository.BookingRepo;
import com.OnDemandCarWash.bookingservice.Exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    BookingRepo bookingRepo;

    // Getting all the details
    public List<Booking> getAllBooking()  {
        return  bookingRepo.findAll();
    }

    // Getting the order by the orderId
    public Booking getBookingById(String bookingId){

        Optional<Booking> booking = bookingRepo.findById(bookingId);
        booking.orElseThrow(()->new ResourceNotFoundException("Booking with id: "+bookingId+" is not found"));
        return  booking.get();
    }

    public  List<Booking> getBookingByCustomerId(String customerId){

              return  bookingRepo.findByCustomerId(customerId);
    }

    public Booking addBooking(Booking booking)
    {
        return  bookingRepo.save(booking);
    }

    public List<Booking> getBookingByWasherId(String washerId) {
        return  bookingRepo.findByWasherId(washerId);
    }

    public boolean updateOrder(Booking updatedBooking) {

        Optional<Booking> existsBooking = bookingRepo.findById(updatedBooking.get_id());
        existsBooking.orElseThrow(()->new ResourceNotFoundException("Booking with booking id: "+updatedBooking.get_id()+" not found"));


        Booking existingBooking = existsBooking.get();

        //setting the id
        updatedBooking.set_id(existingBooking.get_id());
        updatedBooking.setCustomerId(existingBooking.getCustomerId());

        if(updatedBooking.getWasherId()==null){
            updatedBooking.setWasherId(existingBooking.getWasherId());
        }
        // updating other changed values

        if(existingBooking.getWasherId()==null){
            if(updatedBooking.getWasherId()!=null){
                updatedBooking.setWasherId(updatedBooking.getWasherId());
            }
        }

        // checking if we are getting null values from the end user
         if(updatedBooking.getCustomerName()==null)
             updatedBooking.setCustomerName(existingBooking.getCustomerName());
         if(updatedBooking.getWasherName()==null)
             updatedBooking.setWasherName(existingBooking.getWasherName());
         if(updatedBooking.getWashingDate()==null)
             updatedBooking.setWasherName(existingBooking.getWashingDate());
         if(updatedBooking.getTime()==null)
             updatedBooking.setTime(existingBooking.getTime());
         if(updatedBooking.getWashingType()==null)
             updatedBooking.setWashingType(existingBooking.getWashingType());
         if(updatedBooking.getCarModal()==null)
             updatedBooking.setWashingType(existingBooking.getCarModal());
         if(updatedBooking.getCarNumber()==null)
             updatedBooking.setWashingType(existingBooking.getCarNumber());
          if(updatedBooking.getPaymentStatus()==null)
              updatedBooking.setPaymentStatus(existingBooking.getPaymentStatus());

          if(updatedBooking.getAddress()==null){
               Address address = new Address();
               address.setPincode(existingBooking.getAddress().getPincode());
               address.setCity(existingBooking.getAddress().getCity());
               address.setState(existingBooking.getAddress().getState());
               address.setStreet(existingBooking.getAddress().getStreet());
           }

          if((updatedBooking.getStatus().equals(existingBooking.getStatus()))==false){
              if(updatedBooking.getStatus()==null)
                  updatedBooking.setStatus(existingBooking.getStatus());
              else
                  updatedBooking.setStatus(updatedBooking.getStatus());
          }
        bookingRepo.save(updatedBooking);
        return true;
    }
}

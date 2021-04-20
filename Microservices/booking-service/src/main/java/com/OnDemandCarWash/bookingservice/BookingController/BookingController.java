package com.OnDemandCarWash.bookingservice.BookingController;


import com.OnDemandCarWash.bookingservice.BookingModel.Booking;
import com.OnDemandCarWash.bookingservice.BookingService.BookingService;
import com.OnDemandCarWash.bookingservice.Exception.ErrorDetails;
import com.OnDemandCarWash.bookingservice.Exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class BookingController {

    @Autowired
    BookingService bookingService;

// Getting all the order from the database a list
    @GetMapping("/")
    public ResponseEntity<?> getAllBooking(){
        List<Booking> bookingList = bookingService.getAllBooking();
        if(bookingList.isEmpty()){
            throw  new ResourceNotFoundException("No bookings availabe");
        }else{
            return ResponseEntity.ok().body(bookingList);
        }
    }

// getting the order details based on orderId
    @GetMapping("/{bookingId}")
    public  ResponseEntity<?> getBookingDetailsByBookingId(@PathVariable String  bookingId){

        Booking booking=bookingService.getBookingById(bookingId);
        return  ResponseEntity.ok().body(booking);
    }

// Getting the order Details by customerId
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<Booking>> GetBookingDetailsByCustomerId(@PathVariable String  customerId){
        List<Booking> customerBookingList = bookingService.getBookingByCustomerId(customerId);

        if(customerBookingList.isEmpty())
            throw  new ResourceNotFoundException("Booking  with  Customer id: "+customerId+" not found!");
        else
            return ResponseEntity.ok(customerBookingList);
    }

// getting the order Details by WasherId

    @GetMapping("/washer/{washerId}")
    public ResponseEntity<List<Booking>> getBookingDetailsByWasherId(@PathVariable String washerId){
        List<Booking> washerBookingList = bookingService.getBookingByWasherId(washerId);

        if(washerBookingList.isEmpty())
            throw  new ResourceNotFoundException("Booking with washer id: "+washerId+" not found!");
        else
            return ResponseEntity.ok(washerBookingList);
    }


// Adding order to the database
    @PostMapping("/addBooking")
    public ResponseEntity<Booking> addBooking(@RequestBody Booking booking){
        return  ResponseEntity.ok().body(bookingService.addBooking(booking));
    }

// updating the Order status
    @PutMapping ("/updateOrder")
    public ResponseEntity<?> updateOrderDetails(@RequestBody Booking booking){
        boolean flag = bookingService.updateOrder(booking);

        //checking if the data succesfully updated in the database
        if(flag)
            return ResponseEntity.ok(flag);
        else
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ErrorDetails(new Date(),"INTERNAL_SERVER_ERROR","Something went wrong")
            );
    }
}

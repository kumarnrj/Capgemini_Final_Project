package com.OnDemandCarWash.bookingservice.BookingService;

import com.OnDemandCarWash.bookingservice.BookingModel.Address;
import com.OnDemandCarWash.bookingservice.BookingModel.Booking;
import com.OnDemandCarWash.bookingservice.BookingRepository.BookingRepo;
import com.OnDemandCarWash.bookingservice.Exception.ResourceNotFoundException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
@SpringBootTest
public class BookingServiceTest {

    @Autowired
    BookingService service;

    @MockBean
    private BookingRepo bookingRepo;

    // creating a dummy object of address
    Address address = new Address("262531","Pithoragarh","GIC","UK");

    //dummy object of booking
    Booking mockBooking = new Booking("1","neeraj","11","john","33","PENDING","8755946301",(new Date()).toString(),"12:00","NOW","ALTO K10","UK05B3390","PENDING","cod",address,"silver",499);

    //dummy object of list of booking
    List<Booking> mockBookingList= Arrays.asList(
            mockBooking,
            mockBooking
    );


    @Test
    public void getAllBooking() {
        Mockito.when(bookingRepo.findAll()).thenReturn(mockBookingList);
        assertEquals(2,service.getAllBooking().size());
    }

    @Test
    public void getAllBookingWithEmptyList() {
        List<Booking> emptyList= Arrays.asList();
        Mockito.when(bookingRepo.findAll()).thenReturn(emptyList);
        assertEquals(0,service.getAllBooking().size());
    }

    @Test
    public void getBookingById() throws  Exception{
        String expacted = mapToJson(mockBooking);
        String id="123";
        Mockito.when(bookingRepo.findById(id)).thenReturn(java.util.Optional.ofNullable(mockBooking));

        Booking res = service.getBookingById(id);
        assertEquals(expacted,mapToJson(res));
    }

    @Test
    public void getBookingByIdNotFound() throws  Exception{
        try {
            String expacted = mapToJson(mockBooking);
            String id = "123";
            Mockito.when(bookingRepo.findById(id)).thenThrow(new ResourceNotFoundException("id not found"));

            Booking res = service.getBookingById(id);
            assertEquals(HttpStatus.NOT_FOUND,res);
        }catch (Exception e){}
    }


    @Test
    public void getBookingByCustomerId() throws  Exception {

        String id="123";
        Mockito.when(bookingRepo.findByCustomerId(id)).thenReturn(mockBookingList);

       List <Booking> res =  service.getBookingByCustomerId(id);
        assertEquals(2,res.size());
    }

    @Test
    public void getBookingByCustomerIdWithEmptyList() throws  Exception {
        List<Booking> emptyList= Arrays.asList();

        String id="123";
        Mockito.when(bookingRepo.findByCustomerId(id)).thenReturn(emptyList);

        List <Booking> res =  service.getBookingByCustomerId(id);
        assertEquals(0,res.size());
    }

    @Test
    public void addBooking() throws  Exception {
        Mockito.when(bookingRepo.save(mockBooking)).thenReturn(mockBooking);

        Booking res = service.addBooking(mockBooking);

        assertEquals(mapToJson(mockBooking),mapToJson(res));
    }


    @Test
    public void getBookingByWasherId() {
        String id="123";
        Mockito.when(bookingRepo.findByWasherId(id)).thenReturn(mockBookingList);

        List <Booking> res =  service.getBookingByWasherId(id);
        assertEquals(2,res.size());
    }

    @Test
    public void getBookingByWasherIdWithEmptyList() {
        List<Booking> emptyList= Arrays.asList();
        String id="123";
        Mockito.when(bookingRepo.findByWasherId(id)).thenReturn(emptyList);

        List <Booking> res =  service.getBookingByWasherId(id);
        assertEquals(0,res.size());
    }

    @Test
    public void updateOrder() throws Exception {
        Mockito.when(bookingRepo.save(mockBooking)).thenReturn(mockBooking);

        Booking res = service.addBooking(mockBooking);

        assertEquals(mapToJson(mockBooking),mapToJson(res));
    }


    public static String mapToJson(Object mockUser) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return  objectMapper.writeValueAsString(mockUser);
    }
}
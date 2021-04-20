package com.OnDemandCarWash.bookingservice.BookingController;

import com.OnDemandCarWash.bookingservice.BookingModel.Address;
import com.OnDemandCarWash.bookingservice.BookingModel.Booking;
import com.OnDemandCarWash.bookingservice.BookingService.BookingService;
import com.OnDemandCarWash.bookingservice.Exception.ResourceNotFoundException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.RepeatedTest;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
@SpringBootTest
class BookingControllerTest {


    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private BookingService bookingService;

    // creating a dummy object of address
    Address address = new Address("262531","Pithoragarh","GIC","UK");

    //dummy object of booking
    Booking mockBooking = new Booking("1","neeraj","11","john","33","PENDING",(new Date()).toString(),"12:00","NOW","ALTO K10","UK05B3390","PENDING",address);

    //dummy object of list of booking
    List<Booking> mockBookingList= Arrays.asList(
            mockBooking,
            mockBooking
    );


    // test case 1: For GetAllBooking
     @Nested
     class TestGetAllBooking{

         @Test
         void testGetAllBooking() throws Exception{
             String mockBookingListInJson = mapToJson(mockBookingList);

             // mocking the user service
             Mockito.when(bookingService.getAllBooking()).thenReturn(mockBookingList);

             // creating the request builder
             RequestBuilder requestBuilder =MockMvcRequestBuilders.get("/api/");

             //using mockmcv to perform the request
             MvcResult result = mockMvc.perform(requestBuilder).andReturn();

             // fetching the response from the result
             MockHttpServletResponse response = result.getResponse();

             String outputInJson = response.getContentAsString();
             assertEquals(mockBookingListInJson,outputInJson);
             assertEquals(HttpStatus.OK.value(),response.getStatus());
        }

         @Test
         void testGetAllBookingWithNullReturn() throws Exception{
             String mockBookingListInJson = mapToJson(mockBookingList);

             List<Booking> emptyList =Arrays.asList();
             // mocking the user service
             Mockito.when(bookingService.getAllBooking()).thenReturn(emptyList);

             // creating the request builder
             RequestBuilder requestBuilder =MockMvcRequestBuilders.get("/api/");

             //using mockmcv to perform the request
             MvcResult result = mockMvc.perform(requestBuilder).andReturn();

             // fetching the response from the result
             MockHttpServletResponse response = result.getResponse();

             assertEquals(HttpStatus.NOT_FOUND.value(),response.getStatus());
         }

     }

// Test 2. Getting booking details by bookingId
     @Nested
     class TestBookingDetailsByBookingId{
         @Test
         public void getBookingDetailsByBookingId() throws Exception {
             try {
                 String mockBookingInJson = mapToJson(mockBooking);

                 // mocking the user service
                 Mockito.when(bookingService.getBookingById(Mockito.anyString())).thenReturn(mockBooking);

                 // creating the request builder
                 RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/123");

                 //using mockmcv to perform the request
                 MvcResult result = mockMvc.perform(requestBuilder).andReturn();

                 // fetching the response from the result
                 MockHttpServletResponse response = result.getResponse();

                 String outputInJson = response.getContentAsString();
                 assertEquals(mockBookingInJson, outputInJson);
                 assertEquals(HttpStatus.OK.value(), response.getStatus());
             }catch (Exception e){}
         }

         @Test()
         public void getBookingDetailsByBookingIdNotPresent()  {
             try{
             String mockBookingInJson = mapToJson(mockBooking);

             // mocking the user service
             Mockito.when(bookingService.getBookingById(Mockito.anyString())).thenThrow(new ResourceNotFoundException("User id not found"));

             // creating the request builder
             RequestBuilder requestBuilder =MockMvcRequestBuilders.get("/api/123");

             //using mockmcv to perform the request
             MvcResult result = mockMvc.perform(requestBuilder).andReturn();

             // fetching the response from the result
             MockHttpServletResponse response = result.getResponse();

             String outputInJson = response.getContentAsString();

             assertEquals(HttpStatus.NOT_FOUND.value(),response.getStatus());
         } catch (Exception e){}
         }
     }

//Test 3. getting booking Details by CustomerId
     @Nested
     class TestBookingDetailsByCustomerId {


         @Test
         public void getBookingDetailsByCustomerId() {
             try {
                 String mockBookingListInJson = mapToJson(mockBookingList);

                 // mocking the user service
                 Mockito.when(bookingService.getBookingByCustomerId(Mockito.anyString())).thenReturn(mockBookingList);

                 // creating the request builder
                 RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/customer/123");

                 //using mockmcv to perform the request
                 MvcResult result = mockMvc.perform(requestBuilder).andReturn();

                 // fetching the response from the result
                 MockHttpServletResponse response = result.getResponse();

                 String outputInJson = response.getContentAsString();
                 assertEquals(mockBookingListInJson, outputInJson);
                 assertEquals(HttpStatus.OK.value(), response.getStatus());
             } catch (Exception e) {}
         }

         @Test
         public void getBookingDetailsByCustomerIdWithEmptyListReturn() {
             try {
                 List<Booking> emptyList =Arrays.asList();

                 // mocking the user service
                 Mockito.when(bookingService.getBookingByCustomerId(Mockito.anyString())).thenReturn(emptyList);

                 // creating the request builder
                 RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/customer/123");

                 //using mockmcv to perform the request
                 MvcResult result = mockMvc.perform(requestBuilder).andReturn();

                 // fetching the response from the result
                 MockHttpServletResponse response = result.getResponse();

                 String outputInJson = response.getContentAsString();
                 assertEquals(HttpStatus.NOT_FOUND.value(), response.getStatus());
             } catch (Exception e) {}
         }
     }

// Test 4. Getting the Booking details by WasherId
     class TestBookingDetailsByWasherId{
         @Test
         public void getBookingDetailsByWasherId() {
             try {
                 String mockBookingListInJson = mapToJson(mockBookingList);

                 // mocking the user service
                 Mockito.when(bookingService.getBookingByWasherId(Mockito.anyString())).thenReturn(mockBookingList);

                 // creating the request builder
                 RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/washer/123");

                 //using mockmcv to perform the request
                 MvcResult result = mockMvc.perform(requestBuilder).andReturn();

                 // fetching the response from the result
                 MockHttpServletResponse response = result.getResponse();

                 String outputInJson = response.getContentAsString();
                 assertEquals(mockBookingListInJson, outputInJson);
                 assertEquals(HttpStatus.OK.value(), response.getStatus());
             } catch (Exception e) {}
         }

         @Test
         public void getBookingDetailsByWasherIdWithEmptyListReturn() {
             try {

                 List<Booking> emptyList =Arrays.asList();

                 // mocking the user service
                 Mockito.when(bookingService.getBookingByWasherId(Mockito.anyString())).thenReturn(emptyList);

                 // creating the request builder
                 RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/washer/123");

                 //using mockmcv to perform the request
                 MvcResult result = mockMvc.perform(requestBuilder).andReturn();

                 // fetching the response from the result
                 MockHttpServletResponse response = result.getResponse();

                 String outputInJson = response.getContentAsString();

                 assertEquals(HttpStatus.NOT_FOUND.value(), response.getStatus());
             } catch (Exception e) {}
         }
     }

// Test 5. Adding the booking

    @Test
    public void testAddBooking() throws  Exception{
        String mockBookingInJson = this.mapToJson(this.mockBooking);

        // mocking the user service
        Mockito.when(bookingService.addBooking(Mockito.any(Booking.class))).thenReturn(this.mockBooking);

        // creating the request builder
        RequestBuilder requestBuilder = MockMvcRequestBuilders.post("/api/addBooking")
                                                               .accept(MediaType.APPLICATION_JSON)
                                                               .content(mockBookingInJson)
                                                               .contentType(MediaType.APPLICATION_JSON);

        //using mockmcv to perform the request
        MvcResult result = mockMvc.perform(requestBuilder).andReturn();

        // fetching the response from the result
        MockHttpServletResponse response = result.getResponse();

        String outputInJson = response.getContentAsString();
        assertEquals(mockBookingInJson, outputInJson);
        assertEquals(HttpStatus.OK.value(), response.getStatus());
    }

// Test 6. Updating order deatails
    @Nested
    class TestUpdateOrderDetails{

        @Test
        public void testUpdateOrderDetails() {
            try{
                String mockBookingInJson = mapToJson(mockBooking);

                // mocking the user service
                Mockito.when(bookingService.updateOrder(Mockito.any(Booking.class))).thenReturn(true);

                // creating the request builder
                RequestBuilder requestBuilder = MockMvcRequestBuilders.put("/api/updateOrder")
                        .accept(MediaType.APPLICATION_JSON)
                        .content(mockBookingInJson)
                        .contentType(MediaType.APPLICATION_JSON);


                //using mockmcv to perform the request
                MvcResult result = mockMvc.perform(requestBuilder).andReturn();

                // fetching the response from the result
                MockHttpServletResponse response = result.getResponse();

                String outputInJson = response.getContentAsString();
                assertEquals("true", outputInJson);
                assertEquals(HttpStatus.OK.value(), response.getStatus());

            }catch (Exception e){}
        }

        @Test
        public void testUpdateOrderDetailsWithFalseReturn(){
            try{
                String mockBookingInJson = mapToJson(mockBooking);

                // mocking the user service
                Mockito.when(bookingService.updateOrder(Mockito.any(Booking.class))).thenThrow( new ResourceNotFoundException("Not found the user"));

                // creating the request builder
                RequestBuilder requestBuilder = MockMvcRequestBuilders.put("/api/updateOrder")
                        .accept(MediaType.APPLICATION_JSON)
                        .content(mockBookingInJson)
                        .contentType(MediaType.APPLICATION_JSON);


                //using mockmcv to perform the request
                MvcResult result = mockMvc.perform(requestBuilder).andReturn();

                // fetching the response from the result
                MockHttpServletResponse response = result.getResponse();

                String outputInJson = response.getContentAsString();
                assertEquals(HttpStatus.NOT_FOUND.value(), response.getStatus());

            }catch (Exception e){}
        }

    }



    public static String mapToJson(Object mockUser) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return  objectMapper.writeValueAsString(mockUser);
    }
}
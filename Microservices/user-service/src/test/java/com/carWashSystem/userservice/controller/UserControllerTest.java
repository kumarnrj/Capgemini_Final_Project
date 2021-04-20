package com.carWashSystem.userservice.controller;


import com.carWashSystem.userservice.Service.UserService;
import com.carWashSystem.userservice.model.Address;
import com.carWashSystem.userservice.model.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
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
import static org.assertj.core.api.Assertions.assertThat;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
@SpringBootTest
public class UserControllerTest {

    @Autowired
    private  MockMvc mockMvc;

    @MockBean
    private UserService userService;

    Address address = new Address("12345","city","street","state");
    User mockUser = new User("1","test","test","test@123gmail.com","test",address,"8755946301");

    List<User>MockUserList =  Arrays.asList(mockUser);

    @DisplayName("Testing GetAllUser")
    @Test
    public void testGetAllUser() throws Exception {


        String inputInJson = this.mapToJson(this.MockUserList);

        String URI = "/";

        Mockito.when(userService.getAllUser()).thenReturn(this.MockUserList);

        RequestBuilder requestBuilder = MockMvcRequestBuilders.get(URI);


        MvcResult result = mockMvc.perform(requestBuilder).andReturn();

        MockHttpServletResponse response = result.getResponse();

        String outputInJson = response.getContentAsString();
        assertEquals(inputInJson,outputInJson);
        assertEquals(HttpStatus.OK.value(),response.getStatus());


    }

    @Test
    public void testGetUserById() throws  Exception {

        String inputInJson = this.mapToJson(this.mockUser);

        Mockito.when(userService.getUserById(Mockito.anyString())).thenReturn(this.mockUser);
        RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/userId/1");
        MvcResult result = mockMvc.perform(requestBuilder).andReturn();

        // getting the response in json format
        MockHttpServletResponse response = result.getResponse();
        String outputInJson = response.getContentAsString();


        assertEquals(inputInJson,outputInJson);
        assertEquals(HttpStatus.OK.value(),result.getResponse().getStatus());


    }


    @Test
    public void testGetUserByEmail() throws Exception {

        String inputInJson = this.mapToJson(this.mockUser);

        Mockito.when(userService.getUserByEmail(Mockito.anyString())).thenReturn(this.mockUser);
        RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/findByEmail/test@123gmail.com");
        MvcResult result = mockMvc.perform(requestBuilder).andReturn();

        // getting the response in json format
        MockHttpServletResponse response = result.getResponse();
        String outputInJson = response.getContentAsString();


        assertEquals(inputInJson,outputInJson);
        assertEquals(HttpStatus.OK.value(),result.getResponse().getStatus());
    }





    @Test
    public void testAddUser() throws Exception {

        String inputInJson = this.mapToJson(this.mockUser);

        Mockito.when(userService.addUser(Mockito.any(User.class))).thenReturn(this.mockUser);

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                                        .post("/addUser")
                                         .accept(MediaType.APPLICATION_JSON).content(inputInJson)
                                         .contentType(MediaType.APPLICATION_JSON);

        MvcResult result = mockMvc.perform(requestBuilder).andReturn();

        // getting the response in json format
        MockHttpServletResponse response = result.getResponse();
        String outputInJson = response.getContentAsString();

        assertThat(outputInJson).isEqualTo(inputInJson);


    }


    @Test
    public void testUpdateUser() throws Exception {

        String inputInJson = this.mapToJson(this.mockUser);

        Mockito.when(userService.updateUser(Mockito.any(User.class),Mockito.anyString())).thenReturn(this.mockUser);

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .put("/1")
                .accept(MediaType.APPLICATION_JSON).content(inputInJson)
                .contentType(MediaType.APPLICATION_JSON);

        MvcResult result = mockMvc.perform(requestBuilder).andReturn();

        // getting the response in json format
        MockHttpServletResponse response = result.getResponse();
        String outputInJson = response.getContentAsString();

        assertThat(outputInJson).isEqualTo(inputInJson);

    }

    @Test
    public void testUpdateUserPassword() throws Exception{

        String inputInJson = this.mapToJson(this.mockUser);

        Map<String,Object> updatedUser=new HashMap<>();
        updatedUser.put("email","xyz");
        updatedUser.put("newPassword","password");

        String updatedUserInJson = this.mapToJson(updatedUser);

        Mockito.when(userService.updateUserPassword(Mockito.anyString(), Mockito.anyString())).thenReturn(true);

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .patch("/updatePassword")
                .accept(MediaType.APPLICATION_JSON).content(updatedUserInJson)
                .contentType(MediaType.APPLICATION_JSON);

        MvcResult result = mockMvc.perform(requestBuilder).andReturn();

        // getting the response in json format
        MockHttpServletResponse response = result.getResponse();
        String outputInJson = response.getContentAsString();

        assertThat(outputInJson).isEqualTo("true");
    }

    @Test
    public void testUpdateUserByPatch() throws Exception {

        String inputInJson = this.mapToJson(this.mockUser);

        Mockito.when(userService.updateUser(Mockito.any(User.class),Mockito.anyString())).thenReturn(this.mockUser);

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .patch("/1")
                .accept(MediaType.APPLICATION_JSON).content(inputInJson)
                .contentType(MediaType.APPLICATION_JSON);

        MvcResult result = mockMvc.perform(requestBuilder).andReturn();

        // getting the response in json format
        MockHttpServletResponse response = result.getResponse();
        String outputInJson = response.getContentAsString();

        assertThat(outputInJson).isEqualTo(inputInJson);
    }

    @Test
    public void testDeleteUser() throws  Exception {

        String inputInJson = this.mapToJson(this.mockUser);

        Mockito.when(userService.deleteUser(Mockito.anyString())).thenReturn(true);

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .delete("/deleteUser/1")
                .contentType(MediaType.APPLICATION_JSON);

        MvcResult result = mockMvc.perform(requestBuilder).andReturn();

        // getting the response in json format
        MockHttpServletResponse response = result.getResponse();
        String outputInJson = response.getContentAsString();

        assertThat(outputInJson).isEqualTo("true");
    }

    private String mapToJson(Object mockUser) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return  objectMapper.writeValueAsString(mockUser);
    }

}
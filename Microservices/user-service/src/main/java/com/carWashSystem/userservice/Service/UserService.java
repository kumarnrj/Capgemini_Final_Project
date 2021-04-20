package com.carWashSystem.userservice.Service;


import com.carWashSystem.userservice.Exception.ResourceNotFoundException;
import com.carWashSystem.userservice.Repository.UserRepository;
import com.carWashSystem.userservice.model.Address;
import com.carWashSystem.userservice.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class UserService  {

    @Autowired
    UserRepository userRepository;


    public List<User> getAllUser(){
        return
                userRepository.findAll();
    }

    public User getUserById(String id){
        Optional<User> user=userRepository.findById(id);
        user.orElseThrow(()-> new ResourceNotFoundException("User not found with the id "+id));
        return  user.get();
    }

    public  User getUserByEmail(String email){
        Optional<User> user = userRepository.findByEmail(email);
        user.orElseThrow(()->new ResourceNotFoundException(email+" Not found !"));
        return  user.get();


    }


    public User addUser(User user){


       try{
           userRepository.findByEmail(user.getEmail()).get().getEmail();
           return  null;
       } catch (NoSuchElementException e){
           return userRepository.insert(user);
       }

    }

    public User updateUser(User user,String userId){
        if(userRepository.existsById(userId)) {
            User existingUser = userRepository.findById(userId).get();
            user.set_id(existingUser.get_id());
            user.setPassword(existingUser.getPassword());
            if (user.getFirstName() == null) {
                user.setFirstName(existingUser.getFirstName());
            }
            if (user.getLastName() == null) {
                user.setLastName(existingUser.getLastName());
            }
            if (user.getEmail() == null) {
                user.setEmail(existingUser.getEmail());
            }
            if(user.getPhone()==null){
                user.setPhone(existingUser.getPhone());
            }
            if (user.getAddress() == null) {
                Address address = new Address();
                address.setPincode(existingUser.getAddress().getPincode());
                address.setCity(existingUser.getAddress().getCity());
                address.setState(existingUser.getAddress().getState());
                address.setStreet(existingUser.getAddress().getStreet());
                user.setAddress(address);
            }
            if(user.getRole().equals(existingUser.getRole())==false){
                user.setRole(existingUser.getRole());
            }

            return userRepository.save(user);
        }
        else{
            throw  new ResourceNotFoundException("User Not Found");
        }


    }


    public  boolean deleteUser(String userId){
        if(userRepository.existsById(userId)) {
            userRepository.deleteById(userId);
            return true;
        }else{
            throw  new ResourceNotFoundException("User with id: "+userId+" not found");
        }
    }


    public boolean updateUserPassword(String userEmail, String newPassword) {
        Optional<User> user = userRepository.findByEmail(userEmail);
        user.orElseThrow(()->new ResourceNotFoundException("Email is not found"));
        User existingUser = user.get();
        existingUser.set_id(existingUser.get_id());
        existingUser.setPassword(newPassword);
        userRepository.save(existingUser);
        return true;
    }

    public User updateUserByPatch(User user, String userId) {
        if(userRepository.existsById(userId)) {
            user.set_id(userId);
           return userRepository.save(user);

        }
        else{
            throw new ResourceNotFoundException("User with id: "+userId+" not found");
        }
    }
}

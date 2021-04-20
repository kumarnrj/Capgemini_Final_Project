package com.carWashSystem.userservice.controller;

import com.carWashSystem.userservice.Service.UserService;
import com.carWashSystem.userservice.model.Address;
import com.carWashSystem.userservice.model.Response;
import com.carWashSystem.userservice.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.jws.soap.SOAPBinding;
import java.nio.file.Path;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    UserService userService;

    /**
     * returns all the user from the database
     *
     */
    @GetMapping("/")
    public ResponseEntity<List<User>> getAllUser(){
        return ResponseEntity.ok().body(userService.getAllUser());
    }


    /**
     * returns a user details based on the user id.
     */
    @GetMapping("/userId/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable("userId") String userId ){

        return ResponseEntity.ok().body(userService.getUserById(userId));
       // return  userService.getUserById(userId);
    }

    /**
     *Returns true if the user with the email is exists in the database
     * else returns false
     */
    @GetMapping("/findByEmail/{email}")
    public User getUserByEmail(@PathVariable String email){
        return  userService.getUserByEmail(email);
    }

    /**
     *
     *  adds the user into the database
     */

    @PostMapping("/addUser")
    public ResponseEntity<?> Adduser(@RequestBody User user ){


      // user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
      System.out.println(user.getPassword());
       if(userService.addUser(user)==null){
         return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Already Present");
        }
       else{
           User user1 = userService.addUser(user);
          return  ResponseEntity.ok().body(user1);     }
    }

    @PutMapping("/{userId}")
    public User updateUser(@RequestBody User user, @PathVariable("userId") String userId){
        System.out.println(user);
        User user1= userService.updateUser(user,userId);
       return user1;

    }

    @PatchMapping("/updatePassword")
    public boolean updateUserPassword(@RequestBody Map<String,Object> user){
        String userEmail = user.get("email").toString();
        String newPassword = user.get("newPassword").toString();
        return userService.updateUserPassword(userEmail,newPassword);
    }

    @PatchMapping("/{userId}")
    public User updateUserByPatch(@RequestBody User user, @PathVariable("userId") String userId){
        return  userService.updateUserByPatch(user,userId);
    }


    @DeleteMapping("/deleteUser/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable("userId") String userId){
        boolean isUserDeleted = userService.deleteUser(userId);
        if(isUserDeleted)
            return ResponseEntity.ok(new Response("Deleted successfully"));
        else
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response("User Not found"));
    }

}

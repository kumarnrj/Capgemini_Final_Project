import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { Orders } from '../Modals/Orders';
import { Review } from '../Modals/Review';
import {User} from '../Modals/User';
import {UserDetails} from '../Modals/UserDetails';
@Injectable({
  providedIn: 'root'
})




export class AuthenticationService {

  private userEmail:String;
  private isUserVerified:boolean;

  private _url="http://localhost:8100/authenticate";
  private userUrl="http://localhost:8100/user-service/addUser"
  private testUrl="http://localhost:8081/api/";
  private emailUrl="http://localhost:8100/email-service/sendOtp";
  private testEmailUrl="http://localhost:8080/sendOtp"
  private testOrderUrl="http://localhost:8082/api/"


  constructor(private http:HttpClient) { }

  // testing jwt 
  t = localStorage.getItem("token");
   token = "Bearer "+this.t;
   header = new HttpHeaders().set("Authorization",this.token);

  
  getuser(){
    return this.http.get("http://localhost:8100/user-service/api/findByEmail/neeraj.neerajkumar11@gmail.com");
  }


   // getting the user data 
   getUserData(email:String):Observable<UserDetails>{
     console.log("inside it");
     let url = "http://localhost:8081/api/findByEmail/"+email;
     return  this.http.get<UserDetails>(url);
   }

  //authenticate the use
   authenticateUser(email:String,password:String){
          return  this.http.post(this._url,{
             username:email,
             password:password
           })
   }

   
   // adding or registering the user
   registerUser(user:User){
    return this.http.post(this.testUrl+"addUser",user);
   }

   // updating the user 
   updateUser(user:User,userId){
     return this.http.put(this.testUrl+"/"+userId,user);
   }

   // Deleting the user from the database based on the userId
   removeUser(userId:String){
     return this.http.delete(`${this.testUrl}deleteUser/${userId}`);
   }


   // getting all the users
   getAllUser():Observable<UserDetails[]>{
     console.log("inside all user")
     return this.http.get<UserDetails[]>(this.testUrl);
   }

   // send OTP to the user
   sendOtp(email:String){
     return this.http.post(this.testEmailUrl,{
       email:email
     })
   }

   // verify the otp entered by user
   verityOtp(otp){
     return this.http.post("http://localhost:8080/verify-otp",{
       otp:otp
   })
   }

   //to change the password

   changePassword(newPassword:String){
     console.log(this.userEmail);
    return this.http.patch(this.testUrl+"/updatePassword",{
      email:this.userEmail,
      newPassword:newPassword
    })
  }


//********************************* Order Service ****************************************** */

   // Getting all the orders
   getAllOrders():Observable<Orders[]>{
    return this.http.get<Orders[]>(this.testOrderUrl);
  }
  // Getting the orders list 
  getCustomerOrderList(customerId):Observable<Orders[]>{
      return this.http.get<Orders[]>(`${this.testOrderUrl}customer/${customerId}`);
  }
  
  // Getting order by orderId
  getOrderById(orderId:string):Observable<Orders>{
    return this.http.get<Orders>(`${this.testOrderUrl}${orderId}`);
  }

  // Getting the orders list by washerId
  getWasherOrderList(washerId):Observable<Orders[]>{
    return this.http.get<Orders[]>(`${this.testOrderUrl}washer/${washerId}`);
  }

  // update order details
  updateOrder(order:Orders){
    return this.http.put(`${this.testOrderUrl}updateOrder`,order);
  }

  //************************************************************************************** */
   
 // ******************************************* review Service *******************************
 private testReviewUrl ="http://localhost:8083/api/";

// getting all the review
getAllReview():Observable<Review[]>{
   return this.http.get<Review[]>(`${this.testReviewUrl}allReview`);
}

 // getting reviews by washer id
 getWasherReviewList(id):Observable<Review[]>{
   return this.http.get<Review[]>(`${this.testReviewUrl}washerId/${id}`);
 }
 
  
  // getter and setter for userEmail
   getUserEmail():String{
     return this.userEmail;
   }

   setUserEmail(email:String){
    this.userEmail=email;
   }

   // To check if the user is loggedIn or not
   isUserLoggedIn(){
     return !!localStorage.getItem("token");
   }

   //getter and setter for otp is verified or not
   getIsUserVerified():boolean{
     return this.isUserVerified;
   }

   setIsUserVerified(UserVerificationResponse:boolean){
     this.isUserVerified = UserVerificationResponse;
   }
  
   
}

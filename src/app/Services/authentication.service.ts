import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
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
  private invalid:boolean;

  private _url="http://localhost:8100/api/authenticate";
  private userServiceUrl="http://localhost:8100/user-service/api/";
  private bookingServiceUrl="http://localhost:8100/booking-service/api/";
  private reviewSerivceUrl ="http://localhost:8100/review-service/api/";
  private payementServiceUrl="http://localhost:8100/payment-service/api/";
  private reviewServiceUrl="http://localhost:8100/review-service/api/";

  private testUrl="http://localhost:8081/api/";
  private emailUrl="http://localhost:8080/api/";
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

// **************************************  User service and authentication ****************************************
  //authenticate the user
  authenticateUser(email:String,password:String){
    return  this.http.post(this._url,{
       username:email,
       password:password
     })
}

   // getting the user data  by email
   getUserData(email:String):Observable<UserDetails>{
     console.log("inside it");
    //  let url = "http://localhost:8081/api/findByEmail/"+email;
    let url = `${this.userServiceUrl}findByEmail/${email}`;
     return  this.http.get<UserDetails>(url);
   }

  
   // adding or registering the user
   registerUser(user:User){
     let url =`${this.userServiceUrl}addUser`;
     return this.http.post(url,user);
    // return this.http.post(this.testUrl+"addUser",user);
   }

   // updating the user 
   updateUser(user:User,userId){
      let url = `${this.userServiceUrl}${userId}`;
      return this.http.put(url,user);
    //  return this.http.put(this.testUrl+"/"+userId,user);
   }

   // Deleting the user from the database based on the userId
   removeUser(userId:String){
    let url = `${this.userServiceUrl}deleteUser/${userId}`;
    return this.http.delete(url);
    //  return this.http.delete(`${this.testUrl}deleteUser/${userId}`);
   }


   // getting all the users
   getAllUser():Observable<UserDetails[]>{
     console.log("inside all user")
     
     let url = `${this.userServiceUrl}allUser`;
     return this.http.get<UserDetails[]>(url);

    //  return this.http.get<UserDetails[]>(this.testUrl);
   }

   //to change the password

   changePassword(newPassword:String){
    let  email= localStorage.getItem("email");
    let url = `${this.userServiceUrl}updatePassword`; 

      return this.http.patch(url,{
      email:email,
      newPassword:newPassword
    })
  }
//**************************************************** */
//***************************************** Email Service ********************/
 
// send OTP to the user
 sendOtp(email:String){
  return this.http.post(`${this.emailUrl}sendOtp`,{
    email:email
  })
}

// verify the otp entered by user
verityOtp(otp){
  return this.http.post("http://localhost:8080/api/verify-otp",{
    otp:otp
})
}

//********************************* booking Service ****************************************** */

   // add order to databas
   addBooking(newOrder:Orders):Observable<Orders>{
     return this.http.post<Orders>(`${this.bookingServiceUrl}addBooking`,newOrder);
   }

   // Getting all the orders
   getAllOrders():Observable<Orders[]>{
   
    let url =`${this.bookingServiceUrl}allBooking`;
    return this.http.get<Orders[]>(url);
    // return this.http.get<Orders[]>(this.testOrderUrl);
  }
  // Getting the orders list 
  getCustomerOrderList(customerId):Observable<Orders[]>{
      return this.http.get<Orders[]>(`${this.bookingServiceUrl}customer/${customerId}`);
  }
  
  // Getting order by orderId
  getOrderById(orderId:string):Observable<Orders>{
    return this.http.get<Orders>(`${this.bookingServiceUrl}bookingId/${orderId}`);
  }

  // Getting the orders list by washerId
  getWasherOrderList(washerId):Observable<Orders[]>{
    return this.http.get<Orders[]>(`${this.bookingServiceUrl}washer/${washerId}`);
  }

  // update order details
  updateOrder(order:any){
    console.log("inside update ",order);
    return this.http.put(`${this.bookingServiceUrl}updateOrder`,order);
  }

  //update payment status
  updatePaymentStatusInBooking(payment_id,paymentStatus,orderId){
    return this.http.put(`${this.bookingServiceUrl}updatePaymentStatus`,{
        payment_id:payment_id,
        paymentStatus:paymentStatus,
        orderId:orderId
    });
  }

  //************************************************************************************** */
   
 // ******************************************* review Service *******************************
 private testReviewUrl ="http://localhost:8083/api/";

// getting all the review
getAllReview():Observable<Review[]>{
   return this.http.get<Review[]>(`${this.reviewSerivceUrl}allReview`);
}

 // getting reviews by washer id
 getWasherReviewList(id):Observable<Review[]>{
   return this.http.get<Review[]>(`${this.reviewSerivceUrl}washerId/${id}`);
 }

 // add reviews
 addReview(review){
   return this.http.post(`${this.reviewSerivceUrl}add`,review);
 }
 
 //*********************************************************************************** */

 //***************************  payment service  **************************************

 private payemtUrl="http://localhost:8084/";
// creating a payment order
 createPaymentOrder(payAmount,oId){

   return this.http.post(`${this.payementServiceUrl}create_order`,{
     amount:payAmount,
     custOId:oId
   })
 }

// updating the payment order
updatePaymentStatus(payment_id: string, order_id: string, status: string){
   return this.http.post(`${this.payementServiceUrl}update_order`, {
    payment_id: payment_id,
    order_id: order_id,
    status: status
  })

}

 //**************************************************************************************** */
  
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

   // check the role of the user
   isUserCustomer(){
       if(localStorage.getItem("ROLE")==="ROLE_USER"){
         return true;
       }
       return false;
   }

   isUserAdmin(){
    if(localStorage.getItem("ROLE")==="ROLE_ADMIN"){
      return true;
    }
    return false;
   }

   ifUserWasher(){
    if(localStorage.getItem("ROLE")==="ROLE_WASHER"){
      return true;
    }
    return false;
   }

   //getter and setter for otp is verified or not
   getIsUserVerified():boolean{
     return this.isUserVerified;
   }

   setIsUserVerified(UserVerificationResponse:boolean){
     this.isUserVerified = UserVerificationResponse;
   }
  
  


  get isInvalid(){
    return this.invalid;
  }

  setInvalid(res:boolean){
    this.invalid = res;
  }
}

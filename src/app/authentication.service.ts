import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
import {User} from './User'
@Injectable({
  providedIn: 'root'
})




export class AuthenticationService {

  private userEmail:String;
  private isUserVerified:boolean;

  private _url="http://localhost:8100/authenticate";
  private userUrl="http://localhost:8100/user-service/addUser"
  private testUrl="http://localhost:8081";
  private emailUrl="http://localhost:8100/email-service/sendOtp";
  private testEmailUrl="http://localhost:8080/sendOtp"
  constructor(private http:HttpClient) { }

  //authenticate the use
   authenticateUser(email:String,password:String){
          return  this.http.post(this._url,{
             username:email,
             password:password
           })
   }

   
   // adding or registering the user
   registerUser(user:User){
    return this.http.post(this.testUrl,user)
   }

   // send OTP to the user
   sendOtp(email:String){
     return this.http.post(this.testEmailUrl,{
       email:email
     })
   }
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


   // getter and setter for userEmail
   getUserEmail():String{
     return this.userEmail;
   }

   setUserEmail(email:String){
    this.userEmail=email;
   }

   //getter and setter for otp is verified or not
   getIsUserVerified():boolean{
     return this.isUserVerified;
   }

   setIsUserVerified(UserVerificationResponse:boolean){
     this.isUserVerified = UserVerificationResponse;
   }
  
   
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
import {User} from './User'
@Injectable({
  providedIn: 'root'
})




export class AuthenticationService {

  private _url="http://localhost:8100/authenticate";
  private userUrl="http://localhost:8100/user-service/addUser"

  constructor(private http:HttpClient) { }

  //authenticate the use
   authenticateUser(email:String,password:String){
          return  this.http.post(this._url,{
             username:email,
             password:password
           })
   }

   
   // adding or registering the user
   registerUser(firstName:String,lastName:String,email:String,password:String,mobile:String,pincode:String,city:String,stateAd:String,street:String){
    let user:User;
    user ={ name:firstName+" "+lastName,
    email:email,
    password:password,
    phone:mobile,
    address:{
      pincode:pincode,
      city:city,
    state:stateAd,
    street:street
    }}

    return this.http.post(this.userUrl,user)
   }
}

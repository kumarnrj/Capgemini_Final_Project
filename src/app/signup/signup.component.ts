import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication.service'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
 
  public email;
  public password;
  public repassword;
  public firstName;
  public lastName;
  public mobile;
  public pincode;
  public city;
  public street;
  public stateAd;

  public states=["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
    "Goa","Gujarat","Haryana","Himachal Pradesh","Jammu and Kashmir","Jharkhand","Karnataka",
   " Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha",
  "Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal"]

  constructor(private auth:AuthenticationService) { }

  ngOnInit(): void {
  }

  // setting the state name 
  stateData(event){
    this.stateAd=event;
  }

  // calling the register user servie to store the data 
  signup(){
    this.auth.registerUser(this.firstName,this.lastName,this.email,this.password,this.mobile,this.pincode,this.city,this.stateAd,this.street)
    .subscribe(res=>console.log(res),
               err=>console.log(err))
  }

}

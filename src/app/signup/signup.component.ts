import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators,FormBuilder } from '@angular/forms';
import {PasswordValidator} from '../shared/password.validator';
import swal from 'sweetalert2';
import {AuthenticationService} from '../authentication.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  formSubmitted=false;
  public otp;

  constructor(private fb:FormBuilder,private auth:AuthenticationService,private router:Router){}
  ngOnInit() {}


  // Creating form builder for validation of form
  registrationForm = this.fb.group({
    firstName:['',Validators.required],
    lastName:['',Validators.required],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.pattern("^(?=.*\\d)(?=.*[a-z])(?=.*[@$!%*#?&])(?=.*[A-Z])(?!.*\\s).{8,}$")]],
    repassword:[''],
    phone:['',[Validators.required,Validators.pattern('^\\d{10}$')]],
    address:this.fb.group({
      pincode:['',[Validators.required,Validators.pattern('^\\d{6}$')]],
      city:['',Validators.required],
      state:['',Validators.required],
      street:['',Validators.required],
    })
  },{validator:PasswordValidator})

 get firstName(){
   return this.registrationForm.get('firstName');
 }

 get lastName(){
  return this.registrationForm.get('lastName');
 }

 get email(){
  return this.registrationForm.get('email');
 }

 get password(){
   return this.registrationForm.get('password');
 }

 get confirmPassword(){
   return this.registrationForm.get('repassword')
 }

 get mobile(){
  return this.registrationForm.get('phone');
 }

 get pincode(){
   return this.registrationForm.get('address.pincode')
 }
 get city(){
  return this.registrationForm.get('address.city')
 }
 get state(){
  return this.registrationForm.get('address.state')
 }
 get street(){
  return this.registrationForm.get('address.street')
 }

 verifyOtp(){
   this.auth.verityOtp(this.otp).subscribe(res=>{
     swal.fire("Done","Verified","success");
    this.auth.registerUser(this.registrationForm.value).subscribe(res=>console.log(res),
      err=>{
        if(err.status==400)
           swal.fire("Oops","Email is already present","error");
      })
   })
 }
 onSubmit(){
   
   console.log("hello")
   this.auth.sendOtp(this.registrationForm.value.email)
   .subscribe(res=>{
    this.formSubmitted=true;
    //this.router.navigate(["verify"])
   })
   
   
  //  this.auth.registerUser(this.registrationForm.value).subscribe(res=>console.log(res),
  //   err=>{
  //     if(err.status==400)
  //        alert("Email is already present")
  //   })
 }

   // calling the register user servie to store the data 
   signup(){
    //console.log(this.registrationForm)
  //   this.auth.registerUser(this.firstName,this.lastName,this.email,this.password,this.mobile,this.pincode,this.city,this.stateAd,this.street)
  //   .subscribe(res=>console.log(res),
  //              err=>console.log(err))
  // }
  }

  

 

 
}


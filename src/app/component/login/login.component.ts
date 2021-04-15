import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../Services/authentication.service'
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { User } from 'src/app/Modals/User';
import { UserDetails } from 'src/app/Modals/UserDetails';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email:String;
  public password:String;
  private currentUser:UserDetails;
  
  token:string;
  errMsg:string;

  submitted = false;


  constructor(private auth:AuthenticationService,private http:HttpClient
    ,private router:Router) {

   }

  ngOnInit(): void {
    console.log(this.auth.isUserLoggedIn())
  }

  login(){
    this.auth.authenticateUser(this.email,this.password)
    .subscribe((res:any)=>{
           swal.fire("Done","Logged In","success");
           this.token=res.jwt;
           localStorage.setItem("token",this.token);
           localStorage.setItem("email",this.email.toString())
           this.auth.setUserEmail(this.email);
           // getting the user from the database
           this.auth.getUserData(this.email).subscribe( (res:any)=>{
                  this.currentUser = res;
                  localStorage.setItem("id",this.currentUser._id.toString());
                  localStorage.setItem("ROLE",this.currentUser.role.toString());
           })
           
           this.router.navigate(['/']); 
    },
    err=>{
      if(err.status==404){
        this.errMsg = err.error + " Email or Password is wrong!"
      }})

      //  this.http.post("http://localhost:8100/authenticate",{
      //    username:this.email,
      //    password:this.password
      //  }).toPromise().then(res=>console.log(res),
      //                      err=>console.log(err))
  }


 
  

}

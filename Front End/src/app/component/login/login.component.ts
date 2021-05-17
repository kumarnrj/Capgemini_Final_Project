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
                  sessionStorage.setItem("login","yes");
                 
                  if(this.currentUser.role.toString()==="ROLE_ADMIN"){
                    this.router.navigate(['adminDashboard']);
                  }
                  else if(this.currentUser.role.toString()==="ROLE_WASHER"){
                    this.router.navigate(['washerDashboard']);
                  }
                  else {
                    this.router.navigate(['home']);
                  }

           });
          
          
    },
    err=>{
      console.log("hii");
      });

    if(this.auth.isInvalid==true){
      this.errMsg="Wrong email or password";
    }   
  }


 
  

}

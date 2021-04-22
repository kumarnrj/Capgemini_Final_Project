import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router,
             private auth:AuthenticationService,
             private http:HttpClient) { }

  ngOnInit(): void {
    console.log("user logged in",this.auth.isUserLoggedIn());
    console.log("User is customer ",this.auth.isUserCustomer());
    console.log("User is washer",this.auth.ifUserWasher());
    console.log("User is admin ",this.auth.isUserAdmin());

  }

  bookNow(){
     this.router.navigate(["services"]);
  }

 // booking based on package 
 book1(){
   this.router.navigate(['booking',{id:1}]);
 }

 book2(){
   this.router.navigate(["booking",{id:2}]);
 }

 book3(){
   this.router.navigate(["booking",{id:3}]);
 }

 api(){
     this.http.get("http://localhost:8100/user-service/api/allUser")
     .toPromise().then(res=>{
       console.log(res)
     }
     ).catch(err=>{
       console.log(err);
     })
 }
}

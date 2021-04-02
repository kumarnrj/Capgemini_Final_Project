import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email:String;
  public password:String;
  
  token:string;
  errMsg:string;

  submitted = false;


  constructor(private auth:AuthenticationService,private http:HttpClient) {

   }

  ngOnInit(): void {
  }

  login(){
    this.auth.authenticateUser(this.email,this.password)
    .subscribe((res:any)=>{
           
           this.token=res.jwt;
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

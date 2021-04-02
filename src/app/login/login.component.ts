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


  constructor(private auth:AuthenticationService,private http:HttpClient) {

   }

  ngOnInit(): void {
  }

  login(){
    this.auth.authenticateUser(this.email,this.password)
    .subscribe((res:any)=>{
           
           this.token=res.jwt;
    },
    err=>this.token=err.error)

      //  this.http.post("http://localhost:8100/authenticate",{
      //    username:this.email,
      //    password:this.password
      //  }).toPromise().then(res=>console.log(res),
      //                      err=>console.log(err))
  }

}

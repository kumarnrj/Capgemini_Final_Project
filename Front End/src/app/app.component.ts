import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerInterceptorService } from './Interceptors/spinner-interceptor.service';
import {AuthenticationService} from './Services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app-carWash';
  public loggedIn;
  public user=false;
  public admin=false;
  public washer=false;
  
  constructor(public loadService:SpinnerInterceptorService,
      private auth:AuthenticationService,
      private router:Router){
        
      }
  

  ngOnInit(){
    this.loggedIn = this.auth.isUserLoggedIn();
    console.log(this.auth.isUserLoggedIn())
    
    let role = localStorage.getItem("ROLE");
    if(role==="ROLE_USER")
      this.user=true;
    if(role==="ROLE_ADMIN")
      this.admin=true;
    if(role==="ROLE_WASHER")
       this.washer=true;
      

    if(sessionStorage.getItem("login")=="yes"){
      console.log("inside");
      window.location.reload();
      sessionStorage.removeItem("login");
    }
   
  } 

logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    localStorage.removeItem("ROLE");
    this.ngOnInit()
    this.router.navigate(['login'])
}


// redirecting the user when click on my orders
onMyOrder(){
  let role = localStorage.getItem("ROLE");
  if(role==="ROLE_USER")
    this.router.navigate(["/myaccount/orders"]);
  if(role==="ROLE_ADMIN")
    this.router.navigate(["adminDashboard"]);
}
}


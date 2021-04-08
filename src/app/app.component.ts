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
  constructor(public loadService:SpinnerInterceptorService,
      private auth:AuthenticationService,
      private router:Router){
        
      }
  

  ngOnInit(){
    this.loggedIn = this.auth.isUserLoggedIn();
    console.log(this.auth.isUserLoggedIn())
   
  } 

logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    this.ngOnInit()
    this.router.navigate(['login'])
}
}


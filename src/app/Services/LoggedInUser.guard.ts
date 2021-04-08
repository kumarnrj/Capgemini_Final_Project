import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthenticationService } from './authentication.service';


@Injectable({
    providedIn: 'root'
  })
  export class UserLoggedIn implements CanActivate {
  
    constructor(private _authService:AuthenticationService,private _router:Router){}
    canActivate():boolean{
        if(this._authService.isUserLoggedIn()){
            this._router.navigate(['/']);
            return false;
        }else{
           return true;
        }
    }
  }
  

  @Injectable({
    providedIn: 'root'
  })
  export class Profileactive implements CanActivate {
  
    constructor(private _authService:AuthenticationService,private _router:Router){}
    canActivate():boolean{
        if(this._authService.isUserLoggedIn()){
            return true;
        }else{
          
           this._router.navigate(['/']);
            return false;
        }
    }
  }
   
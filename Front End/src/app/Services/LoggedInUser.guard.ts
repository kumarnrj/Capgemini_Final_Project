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
           return true;
        }else{
          this._router.navigate(["login"]);
           return false;
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

 // roles of user
 // ROLE ->  Admin
 @Injectable({
  providedIn: 'root'
})
export class roleAdmin implements CanActivate {

  constructor(private _authService:AuthenticationService,private _router:Router){}
  canActivate():boolean{
      if(this._authService.isUserAdmin()){
          return true;
      }else{
        
         this._router.navigate(['unauthorized']);
          return false;
      }
  }
} 
   
// ROLE -> washer
// roles of user
@Injectable({
  providedIn: 'root'
})
export class roleWasher implements CanActivate {

  constructor(private _authService:AuthenticationService,private _router:Router){}
  canActivate():boolean{
      if(this._authService.ifUserWasher()){
          return true;
      }else{
        
         this._router.navigate(['unauthorized']);
          return false;
      }
  }
} 

// ROLE-> customer
// roles of user
@Injectable({
  providedIn: 'root'
})
export class roleCustomer implements CanActivate {

  constructor(private _authService:AuthenticationService,private _router:Router){}
  canActivate():boolean{
      if(this._authService.isUserCustomer()){
          return true;
      }else{
        
         this._router.navigate(['unauthorized']);
          return false;
      }
  }
} 

// if the user is washer or admin
@Injectable({
  providedIn: 'root'
})
export class UserAdminOrWasher implements CanActivate {

  constructor(private _authService:AuthenticationService,private _router:Router){}
  canActivate():boolean{
      if(this._authService.ifUserWasher() || this._authService.isUserAdmin()){
          return true;
      }else{
        
         this._router.navigate(['unauthorized']);
          return false;
      }
  }
} 
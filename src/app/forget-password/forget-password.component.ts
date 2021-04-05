import { HIGH_CONTRAST_MODE_ACTIVE_CSS_CLASS } from '@angular/cdk/a11y/high-contrast-mode/high-contrast-mode-detector';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  public email:String;
  public submitted;

  constructor(private auth:AuthenticationService,private router:Router) { }

  ngOnInit(): void {
  }

  SendOtp(){
    console.log(this.email);
       this.auth.sendOtp(this.email)
       .subscribe(res=>{
         this.auth.setUserEmail(this.email);
          this.router.navigate(["verify"]);
       },
       err=>console.log(err))
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.scss']
})
export class VerifyUserComponent implements OnInit {

  public otp;
  constructor(private auth:AuthenticationService) { }

  
  ngOnInit(): void {
  }

  verifyOtp(){
        this.auth.verityOtp(this.otp).subscribe(res=>console.log(res));
  }

}

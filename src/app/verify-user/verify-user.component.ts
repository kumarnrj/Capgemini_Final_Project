import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.scss']
})
export class VerifyUserComponent implements OnInit {

  public otp;
  public submitted;
  constructor(private auth:AuthenticationService,private router:Router) { }

  
  ngOnInit(): void {
  }

  verifyOtp(){
        this.auth.verityOtp(this.otp).subscribe(
          res=>{
          this.auth.setIsUserVerified(true);
          this.auth.setUserEmail(this.auth.getUserEmail());
          swal.fire("Done","Verified","success");
          this.router.navigate(["changePassword"]);
        });
  }

  

}

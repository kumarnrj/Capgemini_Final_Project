import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../Services/authentication.service';
import swal from 'sweetalert2';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.scss']
})
export class VerifyUserComponent implements OnInit {

  public otp;
  public submitted;
  private email;
  constructor(private auth:AuthenticationService,private router:Router
    ,private route:ActivatedRoute) { }

  
  ngOnInit(): void {
    this.route.paramMap.subscribe((params:ParamMap)=>{
      this.email = params.get('id'); 
   })
  }

  verifyOtp(){
        this.auth.verityOtp(this.otp,this.email).subscribe(
          res=>{
          this.auth.setIsUserVerified(true);
          this.auth.setUserEmail(this.auth.getUserEmail());
          swal.fire("Done","Verified","success");
          this.router.navigate(["changePassword"]);
        },err=>{
          swal.fire("Oops","Wrong Otp","error");
        });
  }

  

}

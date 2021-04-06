import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { AuthenticationService } from '../../Services/authentication.service';
import {PasswordValidator} from '../../shared/password.validator';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private fb:FormBuilder,private auth:AuthenticationService,private router:Router) { }

  ngOnInit(): void {
  }

  ChagnePasswordForm = this.fb.group({
    password:['',[Validators.required,Validators.pattern("^(?=.*\\d)(?=.*[a-z])(?=.*[@$!%*#?&])(?=.*[A-Z])(?!.*\\s).{8,}$")]],
    repassword:[''],
  },{validator:PasswordValidator})

  get password(){
    return this.ChagnePasswordForm.get('password');
  }
 
  get confirmPassword(){
    return this.ChagnePasswordForm.get('repassword')
  }
 
  ChangePassword(){
   
    console.log(this.ChagnePasswordForm.value.password);
    console.log(this.auth.getUserEmail());

    this.auth.changePassword(this.ChagnePasswordForm.value.password)
    .subscribe(res=>{
      swal.fire("Done","Your password has been changed","success");
      this.router.navigate(["login"])
    })
  }

}

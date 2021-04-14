import { HIGH_CONTRAST_MODE_ACTIVE_CSS_CLASS } from '@angular/cdk/a11y/high-contrast-mode/high-contrast-mode-detector';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  private role;

  constructor(private router:Router,
              private auth:AuthenticationService) { }

  ngOnInit(): void {
  }
 
  myProfile(){
    this.router.navigate(["myaccount/profile"]);
  
  }

  ViewUsers(){
    this.role ="users"
      this.router.navigate(["adminDashboard",this.role]);
  }
  viewOrders(){
       
  }
  viewWasher(){
    this.role="washers"
    this.router.navigate(["adminDashboard",this.role]);
  }
  
}

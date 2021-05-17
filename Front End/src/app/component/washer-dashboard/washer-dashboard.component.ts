import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-washer-dashboard',
  templateUrl: './washer-dashboard.component.html',
  styleUrls: ['./washer-dashboard.component.scss']
})
export class WasherDashboardComponent implements OnInit {

  constructor(private route:ActivatedRoute,
              private router:Router,
              ) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("login")=="yes"){
      window.location.reload();
      sessionStorage.removeItem("login");
    }
  }

  // view orders

  viewOrders(){
    this.router.navigate(["Dashboard/Orders",{id:1}]);
  }

  // view  review 
  viewRiew(){
    this.router.navigate(["Reviews-Rating",{id:2}]);
  }

  // routing on click on update order
updateOrder(){
  this.router.navigate(["Dashboard/Orders",{id:2}]);
}
}

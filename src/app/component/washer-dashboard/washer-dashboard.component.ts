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
  }

  // view orders

  viewOrders(){
    this.router.navigate(["Dashboard/Orders"]);
  }

  // view  review 
  viewRiew(){
    this.router.navigate(["Reviews-Rating"]);
  }
}

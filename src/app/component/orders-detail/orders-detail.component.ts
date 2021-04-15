import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router'
import { Orders } from '../../Modals/Orders';
import {AuthenticationService} from '../../Services/authentication.service';
@Component({
  selector: 'app-orders-detail',
  templateUrl: './orders-detail.component.html',
  styleUrls: ['./orders-detail.component.scss']
})
export class OrdersDetailComponent implements OnInit {

  public id;
  public status='PENDING';
  public paymentStatus=true;

  OrderDetail:Orders;
  constructor(private route:ActivatedRoute,
              private auth:AuthenticationService,
              private router:Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    console.log(this.id);
  
    
    setTimeout(
      ()=>{
          this.auth.getOrderById(this.id)
          .subscribe(res=>{
            console.log(res)
              this.OrderDetail=res;
          },
          err=>console.log(err));
      },1
    )


  }

}

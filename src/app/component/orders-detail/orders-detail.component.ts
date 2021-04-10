import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import { Orders } from 'src/app/Services/Orders';
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
              private auth:AuthenticationService) { }

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

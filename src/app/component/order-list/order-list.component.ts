import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { Orders } from '../../Modals/Orders';
import { UserDetails } from '../../Modals/UserDetails';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  //variables 
  private id;
  private user:UserDetails;
  public orderList:Orders[];


  constructor(private auth:AuthenticationService) { }
  

  ngOnInit(): void {
     this.getUser();
  }

  getUser(){
   setTimeout(()=>{
    this.auth.getUserData(localStorage.getItem("email"))
    .subscribe(res=>{
        this.user= res;
        const newLocal = this;
        this.id = newLocal.user._id;
        setTimeout(()=>{
          this.auth.getWasherOrderList(this.id)
          .subscribe(res=>{
            this.orderList=res.filter(order=>order.status==="PENDING" || 
              order.status==="PROCESSING");
          })
      },1)
    })
   },1)
    
    
  }

  onClick(){
    this.auth.getuser()
    .subscribe(res=>{
      console.log(res)
    },err=>console.log(err))
  }


  // accept the order
  acceptOrder(order:Orders){
    console.log(order);
    order.status="PROCESSING"
    this.auth.updateOrder(order)
    .subscribe(res=>{
      console.log(res);
    })
  }

  // rejects the order
  rejectOrder(order){
    order.status="CANCELED";
     this.auth.updateOrder(order)
     .subscribe(res=>{
       console.log(res)
     })
  }
}

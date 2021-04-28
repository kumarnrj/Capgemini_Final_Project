import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute,ParamMap } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { Orders } from '../../Modals/Orders';
import { UserDetails } from '../../Modals/UserDetails';
import swal from 'sweetalert2';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  //variables 
  private id;
  public btnClicked=true;
  private user:UserDetails;
  public orderList:Orders[];

  public isViewOrderByWasher;
  public isUpdateOrderByWasher;
  public isViewOrderByAdmin;
  public isUpdateOrderByAdmin;
  public orderAssigned=true;

  public washer;
  public washerIdList;
  // variable for update payment status and order status
   public orderStatus;
   public paymentStatus;

// injecting the modal 
@ViewChild('frame') public modal: any;

  constructor(private auth:AuthenticationService,
              private route:ActivatedRoute) { }
  

  ngOnInit(): void {
    let id;
    this.route.paramMap.subscribe((params:ParamMap)=>{
       id = parseInt(params.get('id')); 
    })


    if(id==1){
      this.isViewOrderByWasher=true;
      this.getWasherOrder();
    }

    if(id==2){
      this.isUpdateOrderByWasher=true;
      this.getWasherOrder();
    }
    
    if(id==3){
      this.isViewOrderByAdmin=true;
      this.getALlOrder();
    }
    if(id==4){
      this.isUpdateOrderByAdmin =true;
      this.getALlOrder();
    }
     
  }

  // Getting the order details of the washer
  getWasherOrder(){
   setTimeout(()=>{
    this.auth.getUserData(localStorage.getItem("email"))
    .subscribe(res=>{
        this.user= res;
        const newLocal = this;
        this.id = newLocal.user._id;
        setTimeout(()=>{
          this.auth.getWasherOrderList(this.id)
          .subscribe(res=>{
            this.orderList=res;
            
          })
      },1)
    })
   },1)
  }

 // Getting all the Order details when admin is logged in.
 getALlOrder(){
   setTimeout(()=>{
     this.auth.getAllOrders()
     .subscribe(res=>{
       console.log(res);
       this.orderList=res;
     },err=>{
       console.log(err)
     });
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
       this.isViewOrderByWasher=false;
     })
  }

  // update 
  orderCompleted(order){
    order.status="COMPLETED";
    order.paymentStatus="PAID";
    this.auth.updateOrder(order)
    .subscribe(res=>{
      console.log(res);
    })
  }

  // order cancel by washer after accepting it 
  orderCancel(order){
    order.status="CANCELED";
    this.auth.updateOrder(order)
    .subscribe(res=>{
      console.log(res);
    })
  }

  // assign order
   private currentOrder:Orders;
  assignOrder(order){
    
    this.currentOrder = order;
    this.orderAssigned= false;
    this.auth.getAllUser()
    .subscribe((res)=>{
          this.washerIdList = res.filter(user=>user.role==='ROLE_WASHER');
    },err=>{
      console.log(err);
    })
    this.modal.show();

  }

 
  // updating the washer in the database
  UpdateWasherInBookingList(){
    let data = this.washer.split(",");
    let washerId = data[0];
    let washerName= data[1];
    this.currentOrder.washerId = washerId;
    this.currentOrder.washerName = washerName;
   
    //calling the auth service 
    this.auth.updateOrder(this.currentOrder)
    .subscribe(res=>{
      console.log(res);
      swal.fire("Done","Washer Assigned Successfully","success")
      this.modal.hide();
    },
    err=>{
      console.log(err);
      swal.fire("Oops","Something wrong try after sometime","error");
    })
    
  }

}

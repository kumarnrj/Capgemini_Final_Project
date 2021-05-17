import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import {ICustomWindow, WindowRefService} from '../../Services/window-ref.service'
import swal from 'sweetalert2';
import { ActivatedRoute, Router,ParamMap } from '@angular/router';
import { identifierModuleUrl } from '@angular/compiler';
import { Orders } from 'src/app/Modals/Orders';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-payement-gateway',
  templateUrl: './payement-gateway.component.html',
  styleUrls: ['./payement-gateway.component.scss']
})
export class PayementGatewayComponent implements OnInit {

  public amount;
  private _window:ICustomWindow;
  public rzp:any;
  
  public price=0;
  public extraCharges=0;
  public total=0;
  private reqId;
  private custorderId;


  constructor(private auth:AuthenticationService,
              private route:ActivatedRoute,
              private router:Router,
              private http:HttpClient,
              private zone:NgZone,
              private winRef:WindowRefService) {
                this._window = this.winRef.nativeWindow;
               }

  ngOnInit(): void {
         this.route.paramMap.subscribe((params:ParamMap)=>{
           this.reqId= parseInt(params.get("id"));
           this.custorderId = params.get("oid");
           console.log(this.custorderId);
         })

         

         if(this.reqId==1){
           this.price=499;
           this.total=this.price+this.extraCharges;
           this.amount = this.total;
         }
         else if(this.reqId==2){
           this.price=899;
           this.total=this.price+this.extraCharges;
           this.amount = this.total;
         }
        else if(this.reqId==3){
          this.price=1499;
          this.total=this.price+this.extraCharges;
          this.amount = this.total;
         }
         else{
           this.router.navigate(["ax"]);
         }    
  }

   // first request to server to create order

  paymentStart() {
    console.log("payment started ", this.amount)
   

    this.auth.createPaymentOrder(this.amount,this.custorderId).subscribe((res:any) => {
      if (res.status === "created") {
        let options = {
          "key": "rzp_test_X1lxqLWC24TOBN", // Enter the Key ID generated from the Dashboard
          "amount": res.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          "currency": "INR",
          "name": "Car Wash",
          "description": "Booking Transaction",
          "image": "https://example.com/your_logo",
          "order_id": res.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          handler: this.paymentHandler.bind(this),
          modal: {
            ondismiss: (() => {
              this.zone.run(() => {
                swal.fire("Oops","Payment Failed Redirecting to booking page","error");
                this.router.navigate(["booking"]);
              })
            })
          },
          "prefill": {
            "name": "",
            "email": "",
            "contact": ""
          },
          "notes": {
            "address": "Razorpay Corporate Office"
          },
          "theme": {
            "color": "#3399cc"
          }
        };
       
        
        this.rzp = new this.winRef.nativeWindow['Razorpay'](options);

       this. rzp.on('payment.failed', function (res) {
          console.log(res.error.code);
          console.log(res.error.description);
          console.log(res.error.source);
          console.log(res.error.step);
          console.log(res.error.reason);
          console.log(res.error.metadata.order_id);
          console.log(res.error.metadata.payment_id);
          swal.fire("Oops","Payment Failed Redirecting to booking page","error");

        });
        this.rzp.open();
      }
    })

  }

// payment handler
paymentHandler(res: any) {
  this.zone.run(() => {
    console.log("inside payment handler");
    this.updatePaymentOnServer(res.razorpay_payment_id, res.razorpay_order_id, "paid")
  });
}

  
// update the payment in database
  updatePaymentOnServer(payment_id: string, order_id: string, status: string) {
   
    this.auth.updatePaymentStatus(payment_id,order_id,status).subscribe((res) => {
     
     
      this.auth.updatePaymentStatusInBooking(payment_id,status,this.custorderId)
      .subscribe(res=>{
        console.log(res)
      })
      
      swal.fire("Done", "Payment Successful", "success");
    },err => {
      swal.fire("Failed", "Payment not recieved if amount debuted refund will be initiated within 2 working days", "error")
    })
  }

  // cancel payment 
  paymentCancel(){
    swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!'
    }).then((result) => {
      if (result.isConfirmed) {
        swal.fire(
          'Canceled!',
          'Your payment has been canceled.',
          'success'
        ).then((result)=>{
          if(result.isConfirmed){
            this.router.navigate(["home"]);
          }
        })
      }
    })
  }
}

import { ConnectedPositionStrategy, ConnectionPositionPair } from '@angular/cdk/overlay';
import { HashLocationStrategy,DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormGroup,Validators,FormControl} from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Orders } from 'src/app/Modals/Orders';
import { UserDetails } from 'src/app/Modals/UserDetails';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
 
  public step1=false;
  public step2=false;
  public step3 = false;
  public isStep1Completed=true;
  public isStep2Completed= false;
  public isStep3Completed = false;
  public washingType;
  public paymentMode;
  public isCOD=true;
  private reqId;
  private Package:string;
  private amount:number;
  
  //To restrict past date
 
  public minDate = this.datepipe.transform(new Date().toLocaleDateString(),"yyyy-MM-dd");
  
// creating the order object
 private newOrder:Orders;
 private currentUser:UserDetails;
  
  // personal info fromfroup
  // using formGroup
  PersonalForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, Validators.pattern('^\\d{10}$')]),
    address: new FormGroup({
      pincode: new FormControl('', [Validators.required, Validators.pattern('^\\d{6}$')]),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required)
    })
  });

  // creating form control for car details 
   carDetailForm= new FormGroup({
     carModel:new FormControl('',Validators.required),
     carNumber:new FormControl('',Validators.required),
     date:new FormControl('',Validators.required),
     time:new FormControl('',Validators.required)
   })

  constructor(private auth:AuthenticationService,
              private router:Router,
              private route:ActivatedRoute,
              private datepipe:DatePipe) { }

  // ng init metho 
  ngOnInit(): void {
     
    // reading the optional params
    this.route.paramMap.subscribe((params:ParamMap)=>{
      this.reqId = parseInt(params.get('id')); 
   })
      
     if(this.reqId==1){
       this.Package="SILVER";
       this.amount=499;
     }
    else if(this.reqId==2){
      this.Package="GOLD";
      this.amount=899;
    }
    else if(this.reqId==3){
      this.Package="PLATINUM";
      this.amount=1499;
    }
    else{
      this.router.navigate(["**"]);
    }
    

    // fetching the user data 
    setTimeout(()=>{
      this.auth.getUserData(localStorage.getItem("email"))
      .subscribe(res=>{
        this.currentUser = res;
        this.setValuesToPersonalForm();
      },err=>{
        console.log(err);
      })
    },1) 
  }


 // setting the values to the personal form 
 setValuesToPersonalForm(){
   this.PersonalForm.setValue({
     firstName:this.currentUser.firstName,
     lastName:this.currentUser.lastName,
     phone:this.currentUser.phone,
     address:{
       pincode:this.currentUser.address.pincode,
       city:this.currentUser.address.city,
       state:this.currentUser.address.state,
       street:this.currentUser.address.street
     }
   })
 } 

// getting the formcontrol value
get firstName() {
  return this.PersonalForm.get('firstName');
}

get lastName() {
  return this.PersonalForm.get('lastName');
}



get mobile() {
  return this.PersonalForm.get('phone');
}

get pincode() {
  return this.PersonalForm.get('address.pincode')
}
get city() {
  return this.PersonalForm.get('address.city')
}
get state() {
  return this.PersonalForm.get('address.state')
}
get street() {
  return this.PersonalForm.get('address.street')
}

get carModel(){
  return this.carDetailForm.get('carModel');
}

get carNumber(){
  return this.carDetailForm.get('carNumber');
}

get date(){
  return this.carDetailForm.get("date");
}

get time(){
  return this.carDetailForm.get("time");
}


// handling the submission of form 1 (step 1) 
  submitStep1(){
    this.isStep1Completed=false;
    this.step1=true;
    this.isStep2Completed=true;
    
    
    //creating the user 
    let user:UserDetails;
    user = this.PersonalForm.value;
    console.log(user);
    // adding data to order object 
    this.newOrder={
      id:'',
      customerName:'',
      customerId:'',
      washerName:'',
      washerId:'',
      status:'',
      washingDate:'',
      washingType:'',
      time:'',
      paymentStatus:'',
      paymentId:'',
      carBrand:'',
      carModal:'',
      carNumber:'',
      address:{
        pincode:'',
        city:'',
        state:'',
        street:''
      },
      phone:'',
      package:'',
      amount:0
    }
    
    this.newOrder.customerName=user.firstName+" "+user.lastName;
    this.newOrder.customerId=this.currentUser._id;
    this.newOrder.phone = user.phone;
    this.newOrder.address=user.address;

    console.log("new order",this.newOrder);

  }

// handling the submission of form 1 (step 2) 
  submitStep2(){
    this.isStep2Completed = false;
    this.step2 = true;
    this.isStep3Completed = true;

    // case1:  washing type is now 
    if(this.washingType=='now'){
      this.newOrder.washingType="NOW";
       this.newOrder.carModal = this.carDetailForm.value.carModel;
       this.newOrder.carNumber = this.carDetailForm.value.carNumber;
       
        let dte =new Date().toLocaleDateString();
        dte = this.datepipe.transform(dte,"dd-MM-yyyy");
        this.newOrder.washingDate =dte;
        this.newOrder.time = new Date().toLocaleTimeString();
        console.log(this.newOrder);
    }
     else{
      this.newOrder.washingType="SCHEDULED";
        this.newOrder.carModal = this.carDetailForm.value.carModel;
        this.newOrder.carNumber = this.carDetailForm.value.carNumber;
        this.newOrder.washingDate =this.datepipe.transform(this.carDetailForm.value.date,"dd-MM-yyyy");
        this.newOrder.time = this.carDetailForm.value.time;
        console.log(this.newOrder);
     }
    
  }

  step1Link(){
    this.isStep1Completed=true;
  }

  // handling the radio button
  onChangeselect(washingType){
    this.washingType = washingType;
    if(this.washingType==='now'){
      
      this.carDetailForm.get('date').disable();
      this.carDetailForm.get('time').disable();
    }
    else{
      
      this.carDetailForm.get('date').enable();
      this.carDetailForm.get('time').enable();
    }
     
  }

  // handling the step 3 payment mode
  onChangePaymentMode(paymentMode){
    this.paymentMode = paymentMode;
    if(this.paymentMode=='COD'){
      this.isCOD=true;
    }else{
      this.isCOD=false;
    }
  }

  // handling the book now button which is COD booking
  CODBooking(){
    // creating the order model
    this.newOrder.paymentStatus="PENDING";
    this.newOrder.paymentId="COD";
    this.newOrder.status="PENDING";
    this.newOrder.package=this.Package;
    this.newOrder.amount=this.amount;
   
    // storing the data in the dataBase;
    this.auth.addBooking(this.newOrder)
    .subscribe(res=>{
      console.log(res);
    },err=>{
      console.log(err);
    })
  }

  // handling the online booking 
  onlineBooking(){
        this.newOrder.paymentStatus="PENDING";
        this.newOrder.status="PENDING";
        this.newOrder.package=this.Package;
        this.newOrder.amount=this.amount;
      // storing the data in the dataBase;
      this.auth.addBooking(this.newOrder)
      .subscribe((res:any)=>{
        console.log(res)
       // redirecting to the payment gateway
     this.router.navigate(["payment-gateway",{id:this.reqId,oid:res._id}]);
      },err=>{
        console.log(err);
      })

    
      
  }

}

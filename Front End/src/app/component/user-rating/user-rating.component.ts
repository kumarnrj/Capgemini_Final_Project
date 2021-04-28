import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-user-rating',
  templateUrl: './user-rating.component.html',
  styleUrls: ['./user-rating.component.scss']
})
export class UserRatingComponent implements OnInit {

  private customerName;
  private washerId;
  validatingForm: FormGroup;
  constructor(private router:Router,private route:ActivatedRoute
    ,private auth:AuthenticationService) { }

  ngOnInit(): void {
 
    this.route.paramMap.subscribe((params:ParamMap)=>{
      this.washerId = params.get('wid'); 
      this.customerName=params.get("name");
   })


    this.validatingForm = new FormGroup({
      serviceRating:new FormControl('',[Validators.required,Validators.pattern('^\[0-5]{1}$')]),
      washerRating:new FormControl('',[Validators.required,Validators.pattern('^\[0-5]{1}$')]),
      review:new FormControl('',Validators.required)
    })
  }

 // creating the object to get the form object 
 get name(){
    return this.validatingForm.get("serviceRating");
 } 

 get washerRating(){
   return this.validatingForm.get("washerRating");
 }

 

 get review(){
   return this.validatingForm.get("review");
 }

 // sending the customer query
 SendQuery(){
  
    let reviewObject ={
      customerId:localStorage.getItem("id"),
      customerName:this.customerName,
      customerEmail:localStorage.getItem("email"),
      serviceRating:this.validatingForm.value.serviceRating,
      washerRating:this.validatingForm.value.washerRating,
      washerId:this.washerId,
      review:this.validatingForm.value.review
    }

    console.log(reviewObject);
    this.auth.addReview(reviewObject).subscribe(res=>{
      swal.fire("Done","Your review has been submitted Successfully","success")
       .then(res=>{
         if(res.isConfirmed){
           this.router.navigate(["home"]);
         }
       })
     
    })

    
 }
}

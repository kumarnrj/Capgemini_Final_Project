import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,ParamMap } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import {Review} from '../../Modals/Review';
@Component({
  selector: 'app-review-and-rating',
  templateUrl: './review-and-rating.component.html',
  styleUrls: ['./review-and-rating.component.scss']
})
export class ReviewAndRatingComponent implements OnInit {

  public limit=4;
  public isListContainData=true;
  private role;
  private reqId;

  public ReviewList1 =[{
    customerName:'neeraj',
    customerEmail:'dfhfjf',
    serviceRating:3,
    washerRating:3,
    review:'hfjdhfj'
  },{
    customerName:'neeraj',
    customerEmail:'dfhfjf',
    serviceRating:3,
    washerRating:3,
    review:'hfjdhfj'
  },{
    customerName:'neeraj',
    customerEmail:'dfhfjf',
    serviceRating:3,
    washerRating:3,
    review:'hfjdhfj'
  },{
    customerName:'neeraj',
    customerEmail:'dfhfjf',
    serviceRating:3,
    washerRating:3,
    review:'hfjdhfj'
  },{
    customerName:'neeraj',
    customerEmail:'dfhfjf',
    serviceRating:3,
    washerRating:3,
    review:'hfjdhfj'
  },{
    customerName:'neeraj',
    customerEmail:'dfhfjf',
    serviceRating:3,
    washerRating:3,
    review:'hfjdhfj'
  },{
    customerName:'neeraj',
    customerEmail:'dfhfjf',
    serviceRating:3,
    washerRating:3,
    review:'hfjdhfj'
  },{
    customerName:'neeraj',
    customerEmail:'dfhfjf',
    serviceRating:3,
    washerRating:3,
    review:'hfjdhfj'
  },]

  constructor(private auth:AuthenticationService,
              private router:Router,
              private route:ActivatedRoute) { }

  ReviewList:Review[];

  ngOnInit(): void {
    let id = localStorage.getItem("id");
    this.role = localStorage.getItem("ROLE");

    
    this.route.paramMap.subscribe((params:ParamMap)=>{
       this.reqId = parseInt(params.get('id')); 
    })
 
    //reqId==2 && this.role==='ROLE_WASHER'
    if(this.reqId==2){
      this.auth.getWasherReviewList(id)
      .subscribe(res=>{
        this.ReviewList = res;
      },
      err=>{
        console.log(err);
      })
    }

    // admin has requested to view order
    if(this.reqId==1){
      this.auth.getAllReview()
      .subscribe(res=>{
        this.ReviewList = res;
      },err=>{
        console.log(err);
      })
    }

  }

  // show the list by incrementing by 4
  showMore(){
    this.limit=this.limit+4;
    if(this.limit==this.ReviewList1.length){
         this.isListContainData=false;
    }
  }

  // navigate to dashboard
  Dashboard(){
      
    if(this.reqId==1){
      this.router.navigate(["adminDashboard"]);
    }
    if(this.reqId==2){
      this.router.navigate(["washerDashboard"]);
    }
    // if(this.role==='ROLE_WASHER'){
    //   this.router.navigate(["washerDashboard"]);
    // }
  }
}

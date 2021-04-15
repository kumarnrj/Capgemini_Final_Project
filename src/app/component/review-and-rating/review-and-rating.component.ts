import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
              private router:Router) { }

  ReviewList:Review[];

  ngOnInit(): void {
    let id = localStorage.getItem("id");
    this.role = localStorage.getItem("ROLE");
    if(this.role==='ROLE_WASHER'){
      this.auth.getWasherReviewList(id)
      .subscribe(res=>{
        this.ReviewList = res;
      },
      err=>{
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
    if(this.role==='ROLE_WASHER'){
      this.router.navigate(["washerDashboard"]);
    }
  }
}

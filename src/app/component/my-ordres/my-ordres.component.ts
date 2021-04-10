import { ChangeDetectorRef, Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import {Orders} from '../../Services/Orders';
import {AuthenticationService} from '../../Services/authentication.service';
import swal from 'sweetalert2';
import { delay, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-my-ordres',
  templateUrl: './my-ordres.component.html',
  styleUrls: ['./my-ordres.component.scss']
})
export class MyOrdresComponent implements OnInit {
 
  constructor(private _auth:AuthenticationService,
    private cdr:ChangeDetectorRef,
    private router:Router) { }

  public ordersList:Orders[];
  public updatedList:Orders[];

  public List=["hi","hello","hy","what's up"]

 
  
  ngOnInit(): void {
    setTimeout(
      ()=>{
        this._auth.getCustomerOrderList("605247fc401b8742f82b3266")
        .subscribe(res=>{
          console.log(res);
          this.ordersList=res;
        },
        err=>{
          console.log(err)
              swal.fire("Oops","Something wrong try after some time","error")
        })
      },1
    )
       
  }
 
  OnOrderClick(list){
    //localStorage.setItem("orderId",list._id);
    this.router.navigate(["myaccount/myorders",list._id]);

  }
 
}

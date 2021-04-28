import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  book1(){
    
    this.router.navigate(["booking",{id:1}]);
  }
  book2(){
    
    this.router.navigate(["booking",{id:2}]);
  }
  book3(){
    
    this.router.navigate(["booking",{id:3}]);
  }

}

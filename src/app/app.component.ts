import { Component } from '@angular/core';
import { SpinnerInterceptorService } from './Interceptors/spinner-interceptor.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app-carWash';
  
  constructor(public loadService:SpinnerInterceptorService){}
  

  ngOnInit(){} 
  

  
}


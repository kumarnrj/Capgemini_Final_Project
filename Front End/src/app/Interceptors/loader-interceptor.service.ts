import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import swal from 'sweetalert2';
import { AuthenticationService } from '../Services/authentication.service';
import { SpinnerInterceptorService } from './spinner-interceptor.service';

@Injectable()
export class LoaderInterceptorService implements HttpInterceptor {

  constructor(public injector:Injector,
    private auth:AuthenticationService,
    private router:Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let loadService =  this.injector.get(SpinnerInterceptorService)
    loadService.isLoading.next(true);
    let t = localStorage.getItem("token");
    
    // excluded the url
    const re = "/authenticate";
    const re1 ="/user-service/api/addUser";
    const re2 = "/user-service/api/findByEmail/";
    const re4 = '/email-service/api/';
    if(req.url.search(re2)===-1 && req.url.search(re)===-1 && req.url.search(re1)===-1 && req.url.search(re4)===-1 ){
      req = req.clone({
        setHeaders:{
          Authorization:'Bearer '+t
        }
      })
    }
    
    return next.handle(req).pipe(
      catchError(err=>{
         let handled=false;
         if(err instanceof HttpErrorResponse){
            if(err instanceof ErrorEvent){
              console.log("error evene");
            }
            else{
              switch (err.status) {
                case 0:
                  swal.fire("Oops","Server is not responding try after sometime","error");
                  handled=true;
                  this.router.navigate(["home"]);
                  break;
                case 404:
                  console.log("bad credits");
                  handled=true;
                  swal.fire("Oops","Wrong Username or Password","error");

                  break;
                case 401:      
                 
                  console.log("401");
                  handled = true;
                  break;
                case 403:     
                
                  console.log(`403`);
                  handled = true;
                  break;
              }
            }
         }
         else{
           console.log("other error");
         }

         if(handled){
           return of(err);
         }else{
           console.log("throw back the error");
           return throwError(err);
         }

      }),
      finalize(
        ()=>{
          loadService.isLoading.next(false);
        }
      )
    )
  }
}

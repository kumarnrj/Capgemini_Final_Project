import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SpinnerInterceptorService } from './spinner-interceptor.service';

@Injectable()
export class LoaderInterceptorService implements HttpInterceptor {

  constructor(public injector:Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let loadService =  this.injector.get(SpinnerInterceptorService)
    loadService.isLoading.next(true);
    let t = localStorage.getItem("token");
    
    let token = req.clone({
      setHeaders:{
        Authorization:'Bearer '+t
      }
    })
    return next.handle(req).pipe(
      finalize(
        ()=>{
          loadService.isLoading.next(false);
        }
      )
    )
  }
}

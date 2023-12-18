import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authservice: AuthService){}
  
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // const authToken = this.authservice.getToken();
    // if(authToken){
    //   const authReq = req.clone({
    //     headers: req.headers.set('Authorization', `Bearer ${authToken}`),
    //   })
    //   return next.handle(authReq);
    // }
    return next.handle(req);
  }
}
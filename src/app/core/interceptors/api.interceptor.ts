import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';

@Injectable()
export class APIInterceptor implements HttpInterceptor {

  baseUrl = environment.baseUrl
  loginStatus = this.authService.loginStatusChange.value

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    if(request.url.indexOf('api') !== -1){
      request = request.clone({
        url: `${this.baseUrl}${request.url}`
      })
    }

    if(this.loginStatus.isLoggedIn){
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.loginStatus.accessToken}`
        }
      })
    }

    return next.handle(request);
  }
}

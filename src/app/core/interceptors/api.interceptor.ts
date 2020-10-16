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
import { K_ACCESS_TOKEN_KEY } from '../constants/general';

@Injectable()
export class APIInterceptor implements HttpInterceptor {

  baseUrl = environment.baseUrl
  
  constructor(private authService: AuthService) {}
  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = localStorage.getItem(K_ACCESS_TOKEN_KEY) || null
    
    if(request.url.indexOf('api') !== -1){
      request = request.clone({
        url: `${this.baseUrl}${request.url}`
      })
    }

    if(accessToken){
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      })
    }

    return next.handle(request);
  }
}

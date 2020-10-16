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
  accessToken = localStorage.getItem(K_ACCESS_TOKEN_KEY) || null

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    if(request.url.indexOf('api') !== -1){
      request = request.clone({
        url: `${this.baseUrl}${request.url}`
      })
    }

    if(this.accessToken){
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.accessToken}`
        }
      })
    }

    return next.handle(request);
  }
}

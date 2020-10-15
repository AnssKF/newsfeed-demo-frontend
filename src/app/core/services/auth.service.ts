import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ILoginPayload, IJWTPayload, ISignupPayload } from '../interfaces/auth';
import { K_AUTH_API } from '../constants/api';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(payload: ILoginPayload) {
    return this.http.post<IJWTPayload>(K_AUTH_API.LOGIN(), payload)
  }

  signup(payload: ISignupPayload) {
    return this.http.post<IJWTPayload>(K_AUTH_API.SIGNUP(), payload)
  }
}

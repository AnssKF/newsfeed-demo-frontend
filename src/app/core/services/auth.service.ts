import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ILoginPayload, IJWTPayload, ISignupPayload, ILoginStatus } from '../interfaces/auth';
import { K_AUTH_API } from '../constants/api';
import { BehaviorSubject } from 'rxjs';
import { K_ACCESS_TOKEN_KEY } from '../constants/general';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _loginStatus: BehaviorSubject<ILoginStatus> = new BehaviorSubject<ILoginStatus>({isLoggedIn: false, accessToken: ''})

  constructor(private http: HttpClient) {
    const accessToken = localStorage.getItem(K_ACCESS_TOKEN_KEY) || null
    if(accessToken){
      this.tokenVerify(accessToken).then()
    }
  }

  login(payload: ILoginPayload) {
    return this.http.post<IJWTPayload>(K_AUTH_API.LOGIN(), payload)
  }

  signup(payload: ISignupPayload) {
    return this.http.post<IJWTPayload>(K_AUTH_API.SIGNUP(), payload)
  }

  logout() {
    localStorage.removeItem(K_ACCESS_TOKEN_KEY)
    this._loginStatus.next({
      isLoggedIn: false,
      accessToken: ''
    })
  }

  setToken(token: string) {
    localStorage.setItem(K_ACCESS_TOKEN_KEY, token)
    this._loginStatus.next({
      isLoggedIn: true,
      accessToken: token
    })
  }

  async tokenVerify(token: string): Promise<void>{
    try{
      await this.http.post<IJWTPayload>(K_AUTH_API.TOKEN_VERIFY(), {token}).toPromise();
      this.setToken(token)
    }catch(e) {
      this.logout();
    }
  }

  get loginStatusChange() {
    return this._loginStatus
  }

}

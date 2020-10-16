import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ILoginPayload, IJWTPayload, ISignupPayload, ILoginStatus } from '../interfaces/auth';
import { K_AUTH_API } from '../constants/api';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { K_ACCESS_TOKEN_KEY } from '../constants/general';



@Injectable()
export class AuthService {

  private _loginStatus: Subject<ILoginStatus> = new Subject<ILoginStatus>()
  private _verified: boolean = false;

  constructor(private http: HttpClient) {
  }
  
  async init() {
    const accessToken = localStorage.getItem(K_ACCESS_TOKEN_KEY) || null
    if(accessToken){
      await this.tokenVerify(accessToken)
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
    this._verified = false;
    this._loginStatus.next({
      isLoggedIn: false,
      accessToken: ''
    })
  }

  async isLoggedIn(): Promise<boolean>{
    if(this._verified)
        return Promise.resolve(true)
    
    const accessToken = localStorage.getItem(K_ACCESS_TOKEN_KEY) || null
    if(accessToken)
      try{
        await this.tokenVerify(accessToken)
        return Promise.resolve(true)
      }catch(e){}

      
    return Promise.reject(false)
  }

  setToken(token: string) {
    localStorage.setItem(K_ACCESS_TOKEN_KEY, token)
    this._verified = true;
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

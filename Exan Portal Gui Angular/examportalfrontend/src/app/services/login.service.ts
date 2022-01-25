import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public LoginStatusSubject = new Subject<boolean>();
  constructor(private http:HttpClient) { }

  // to get the current user
  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`)
  }

  // generate token for the login process
  public generateToken(loginData: any){
    return this.http.post(`${baseUrl}/generate-token`,loginData)
  }

  // validate token
  public validateToken(token){
    return this.http.get(`${baseUrl}/validity-token/${token}`)
  }

  // login user : set token in localStorage
  public loginUser(token){
    localStorage.setItem('token', token);
    return true;
  }

  // is user is logged in

  public isLoggedIn(){
    let isToken = localStorage.getItem('token');
    if(isToken == undefined || isToken == null || isToken == null){
      return false;
    }else{
      return true;
    }
  }

  // to logout user
  public logoutUser(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  // get token from localStorage
  public getToken(){
    return localStorage.getItem('token');
  }

  // to set user in localStorage
  public setUser(user){
    localStorage.setItem('user',JSON.stringify(user));
  }

  // get user from localStorage
  public getUser(){

    let userStr = localStorage.getItem('user');
    if(userStr!=null){
        return JSON.parse(userStr);
    }else{
      this.logoutUser();
      return null;
    }

  }

  // get user role
  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }

  // get user role
  public getUserName(){
    let user = this.getUser();
    return user.username;
  }

}

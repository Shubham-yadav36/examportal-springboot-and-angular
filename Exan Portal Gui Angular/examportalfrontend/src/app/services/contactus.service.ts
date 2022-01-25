import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ContactusService {

  constructor(private http:HttpClient) { }

  public addContactus(contactus){
    return this.http.post(`${baseUrl}/contactus/`,contactus);
  }

  public getContactus(){
    return this.http.get(`${baseUrl}/contactus/`);
  }
}

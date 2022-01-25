import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  constructor(private http:HttpClient) { }

  // get all the categories from server
  public getCategories(){
    return this.http.get(`${baseUrl}/category/`);
  }

  // get add the category to server
  public addCategory(category){
    return this.http.post(`${baseUrl}/category/`,category);
  }
}

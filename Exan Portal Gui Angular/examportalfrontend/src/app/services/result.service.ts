import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private http:HttpClient) { }

  public addResult(result){
    return this.http.post(`${baseUrl}/result/`, result)
  }

  public getResult(resultId){
    return this.http.get(`${baseUrl}/result/${resultId}`);
  }

  // get all attempted quizzes result by user
  public getResultByUser(userId){
    return this.http.get(`${baseUrl}/result/getresults/${userId}`);
  }
}

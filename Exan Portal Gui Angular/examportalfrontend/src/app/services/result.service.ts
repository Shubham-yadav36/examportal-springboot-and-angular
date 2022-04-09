import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private http:HttpClient) { }

  public addResult(result,qId){
    return this.http.post(`${baseUrl}/result/${qId}`, result)
  }

  public getResult(resultId){
    return this.http.get(`${baseUrl}/result/${resultId}`);
  }

  // get all attempted quizzes result by user
  public getResultByUser(userId,pageNumber,sizeOfPaze){
    return this.http.get(`${baseUrl}/result/getresults/${userId}`,{params:{page:pageNumber,size:sizeOfPaze}});
  }
}

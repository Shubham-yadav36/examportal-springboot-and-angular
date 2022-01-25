import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http:HttpClient) { }

  public addQuiz(quiz){
    return this.http.post(`${baseUrl}/quiz/`,quiz)
  }

  public getAllQuizzes(){
    return this.http.get(`${baseUrl}/quiz/`)
  }

  public deleteQuiz(quizId){
    return this.http.delete(`${baseUrl}/quiz/${quizId}`)
  }

  public updateQuiz(quiz){
    return this.http.put(`${baseUrl}/quiz/`,quiz)
  }

  public getQuizById(id){
    return this.http.get(`${baseUrl}/quiz/${id}`)
  }

  public getQuizByCategory(catId){
    return this.http.get(`${baseUrl}/quiz/category/${catId}`);
  }

  public getAllActiveQuizzes(){
    return this.http.get(`${baseUrl}/quiz/active`)
  }

  public getAllActiveQuizzesForPagination(pageId){
    return this.http.get(`${baseUrl}/quiz/active/${pageId}`)
  }

  public getActiveQuizByCategory(catId){
    return this.http.get(`${baseUrl}/quiz/category/active/${catId}`);
  }

  public DisabledQuiz(){
    return this.http.get(`${baseUrl}/quiz/disabled`);
  }

  // for searching
  public getSearchActiveQuizzes(query){
    return this.http.get(`${baseUrl}/quiz/search/${query}`)
  }

  // for total pages for all quizzes
  public getTotalPageSizeForAllQuiz(){
    return this.http.get(`${baseUrl}/quiz/size/totalPage/all`)
  }
}

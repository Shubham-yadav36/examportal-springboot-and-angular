import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http:HttpClient) { }

  // for admin
  getAllQuestionOfQuiz(qId,pageNumber,sizeOfPage){
    return this.http.get(`${baseUrl}/question/quiz/all/${qId}`,{params:{page:pageNumber,size:'2'}})
  }

  // for normal user
  getQuestionOfQuiz(qId){
    return this.http.get(`${baseUrl}/question/quiz/${qId}`)
  }

  getQuestionById(qId){
    return this.http.get(`${baseUrl}/question/getQuestion/${qId}`)
  }

  addQuestion(question){
    return this.http.post(`${baseUrl}/question/`,question)
  }

  deleteQuestion(qId){
    return this.http.delete(`${baseUrl}/question/${qId}`)
  }
  updateQuestion(question){
    return this.http.put(`${baseUrl}/question/`,question)
  }

  // evaluate result
  evaluateResult(questions){
    return this.http.post(`${baseUrl}/question/eval-result`,questions);
  }

}

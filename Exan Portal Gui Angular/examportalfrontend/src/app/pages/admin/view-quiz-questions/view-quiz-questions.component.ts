import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css'],
})
export class ViewQuizQuestionsComponent implements OnInit {
  qId;
  qTitle;
  questions = [];
  currentPage = 0;
  totalPagesSize = 0;
  size = 2;
  constructor(
    private activatedRoute: ActivatedRoute,
    private quizService: QuizService,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.qId = this.activatedRoute.snapshot.params.qId;
    this.qTitle = this.activatedRoute.snapshot.params.title;
    this.getAllQuestion(this.qId,this.currentPage,this.size)

  }
  getAllQuestion(qId,currentPage,size){
    this.questionService.getAllQuestionOfQuiz(qId,currentPage,size).subscribe(
      (data: any) => {
        this.questions = data.data;
        this.currentPage = data.currentPage;
        this.totalPagesSize= data.totalPage        ;
      },
      (err: any) => {
        Swal.fire('Error !!', 'Error when load Questions', 'error');
      }
    );
  }
  deleteQuestion(qId) {
    this.questionService.deleteQuestion(qId).subscribe(
      (data: any) => {
        Swal.fire({
          icon: 'info',
          showCancelButton: true,
          confirmButtonText: 'Delete',
          title: 'Are you sure you want to delete this question ?',
        }).then((result) => {
          if (result.isConfirmed) {
            this.questions = this.questions.filter((q) => q.qId != qId);
          }
        });
      },
      (err) => {
        Swal.fire('Error !!', 'Question Not Deleted ', 'error');
      }
    );
  }
   // to get number to object
   counter(i: number) {
    return new Array(i);
  }
}
function result(result: any) {
  throw new Error('Function not implemented.');
}
function page(qId: any, page: any, size: any) {
  throw new Error('Function not implemented.');
}

function size(qId: any, page: (qId: any, page: any, size: any) => void, size: any) {
  throw new Error('Function not implemented.');
}


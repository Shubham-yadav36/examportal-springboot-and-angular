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
  constructor(
    private activatedRoute: ActivatedRoute,
    private quizService: QuizService,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.qId = this.activatedRoute.snapshot.params.qId;
    this.qTitle = this.activatedRoute.snapshot.params.title;

    this.questionService.getAllQuestionOfQuiz(this.qId).subscribe(
      (data: any) => {
        this.questions = data;
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
}
function result(result: any) {
  throw new Error('Function not implemented.');
}

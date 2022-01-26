import Swal from 'sweetalert2';
import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { LoginService } from 'src/app/services/login.service';
import { ResultService } from 'src/app/services/result.service';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit {

  qId;
  questions = [];

  // for declate result
  marksGot;
  correctAnswer = 0;
  attempted = 0;
  isSubmitted = false;

  // timer variable
  timer;
  currUser;

  // result related variables
  result = {
    correctAnswer: 0,
    attempted: 0,
    marksGot: 0,
    percentage: 0,
    attemptDate: '',
    user: {
      id: 0
    },
    quiz: {
      qId: 0
    }
  };
  resultId;

  constructor(private locationStrategy: LocationStrategy,
    private activatedRoute: ActivatedRoute,
    private questionService: QuestionService,
    private loginservice: LoginService,
    private resutlService: ResultService,
    private router: Router) { }

  ngOnInit(): void {
    this.preventBackButtonClick();
    this.qId = this.activatedRoute.snapshot.params.qId;
    this.loadQuestion();
  }

  loadQuestion() {
    this.questionService.getQuestionOfQuiz(this.qId).subscribe(
      (data: any) => {
        this.questions = data;
        this.timer = this.questions.length * 2 * 60;
        this.startTimer();
      },
      (error) => { Swal.fire('Error!!', "Error When loading Questions", 'error') }
    );
  }

  preventBackButtonClick() {
    history.pushState(null, null, location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, null, location.href);
    });
  }

  submitQuiz() {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to submit this quiz!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Submit'
    }).then((result) => {
      if (result.isConfirmed) {
        this.evalResult();
      }
    });
  }

  startTimer() {
    let t = window.setInterval(() => {
      if (this.timer <= 0) {
        this.evalResult();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  evalResult() {
    this.questionService.evaluateResult(this.questions).subscribe(
      (data: any) => {
        // call result api to store result
        this.isSubmitted = true;
        this.attempted = data.attempted;
        this.correctAnswer = data.correctAnswer;
        this.marksGot = Number(data.marksGot).toFixed(2);

        // to store result
        this.loginservice.getCurrentUser().subscribe(
          (data: any) => {
            this.result.user.id = data.id,
              this.result.quiz.qId = this.qId,
              this.result.attempted = this.attempted,
              this.result.correctAnswer = this.correctAnswer,
              this.result.marksGot = this.marksGot
            // call api to sore result
            this.resutlService.addResult(this.result, this.qId).subscribe(
              (data: any) => {
                this.resultId = data.rId;
              },
              (err: any) => { Swal.fire("Error !!", 'Error While Saving Result !!', 'error'); }
            )
          }
        )

      },
      (err) => { Swal.fire("Error !!", 'Error While Evaluating Result !!', 'error'); }
    );
  }

  getFormttedTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} min : ${ss} sec`;
  }

  generateResult() {
    this.router.navigate(['/generate-certificate/' + this.resultId]);
  }

}

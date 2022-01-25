import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css'],
})
export class UpdateQuestionComponent implements OnInit {
  updateQuestionForm: FormGroup;
  qId;
  quizId = 0;
  qTitle;

  constructor(
    private activatedRoute: ActivatedRoute,
    private questionService: QuestionService,
    private router: Router,
    private snack: MatSnackBar
  ) {
    this.updateQuestionForm = new FormGroup({
      content: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(1000),
      ]),
      option1: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
      ]),
      option2: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
      ]),
      option3: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
      ]),
      option4: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
      ]),
      answer: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.qId = this.activatedRoute.snapshot.params.qId;
    this.qTitle = this.activatedRoute.snapshot.params.title;
    this.questionService.getQuestionById(this.qId).subscribe(
      (data: any) => {
        this.quizId = data.quiz.qId;
        this.updateQuestionForm.get('content').setValue(data.content),
          this.updateQuestionForm.get('option1').setValue(data.option1),
          this.updateQuestionForm.get('option2').setValue(data.option2),
          this.updateQuestionForm.get('option3').setValue(data.option3),
          this.updateQuestionForm.get('option4').setValue(data.option4),
          this.updateQuestionForm.get('answer').setValue(data.answer);
      },
      (err: any) => {}
    );
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.updateQuestionForm.controls[controlName].hasError(errorName);
  };
  formSubmit() {
    const question = {
      qId: this.qId,
      content: this.updateQuestionForm.get('content').value,
      option1: this.updateQuestionForm.get('option1').value,
      option2: this.updateQuestionForm.get('option2').value,
      option3: this.updateQuestionForm.get('option3').value,
      option4: this.updateQuestionForm.get('option4').value,
      answer: this.updateQuestionForm.get('answer').value,
      quiz: {
        qId: this.quizId,
      },
    };

    this.questionService.updateQuestion(question).subscribe(
      (data) => {
        Swal.fire({
          title: 'Success !!',
          text: 'Question Successfully Updated !',
          icon: 'success',
        }).then((ex) => {
          if (ex.isConfirmed) {
            this.router.navigate([
              '/admin/view-questions/' + this.quizId + '/' + this.qTitle,
            ]);
          }
        });
      },
      (error) => {
        Swal.fire('Error !!', 'Error to add new question', 'error');
      }
    );
  }

  gotoAllQuestions() {
    this.router.navigate([
      '/admin/view-questions/' + this.quizId + '/' + this.qTitle,
    ]);
  }
}

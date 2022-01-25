import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css'],
})
export class AddQuestionComponent implements OnInit {
  qId;
  qTitle;
  question = {
    quiz: {},
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
  };

  addQuestionForm: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private questionService: QuestionService,
    private snack: MatSnackBar,
    private router: Router
  ) {
    this.addQuestionForm = new FormGroup({
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
    this.question.quiz['qId'] = this.qId;
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.addQuestionForm.controls[controlName].hasError(errorName);
  };
  formSubmit() {
    (this.question['content'] = this.addQuestionForm.get('content').value),
      (this.question['option1'] = this.addQuestionForm.get('option1').value),
      (this.question['option2'] = this.addQuestionForm.get('option2').value),
      (this.question['option3'] = this.addQuestionForm.get('option3').value),
      (this.question['option4'] = this.addQuestionForm.get('option4').value),
      (this.question['answer'] = this.addQuestionForm.get('answer').value),
      this.questionService.addQuestion(this.question).subscribe(
        (data) => {
          Swal.fire({
            title: 'Success !!',
            text: 'Question Successfully Added !',
            icon: 'success',
          }).then((ex) => {
            if (ex.isConfirmed) {
              this.router.navigate([
                '/admin/view-questions/' + this.qId + '/' + this.qTitle,
              ]);
            }
          });
        },
        (error) => {
          Swal.fire('Error !!', 'Error to add new question', 'error');
        }
      );
  }
}

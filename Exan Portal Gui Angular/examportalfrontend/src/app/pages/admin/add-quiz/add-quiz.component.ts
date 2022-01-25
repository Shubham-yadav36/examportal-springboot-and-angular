import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { CategoryServiceService } from 'src/app/services/category-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from 'src/app/services/quiz.service';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css'],
})
export class AddQuizComponent implements OnInit {
  categories = [];

  addQuizForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryServiceService,
    private quizService: QuizService,
    private snack: MatSnackBar,
    private router: Router
  ) {
    this.addQuizForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(300),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(1000),
      ]),
      maxMarks: new FormControl(null, [Validators.required, Validators.min(1)]),
      numberOfQuestions: new FormControl(null, [
        Validators.required,
        Validators.min(1),
      ]),
      active: new FormControl(false, []),
      categoryId: new FormControl(null, [
        Validators.required,
      ]),
    });
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.addQuizForm.controls[controlName].hasError(errorName);
  };

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (err: any) => {
        Swal.fire('Error !!', 'Category Loading Failed !!', 'error');
      }
    );
  }

  addQuiz() {
    const quiz = {
      title: this.addQuizForm.get('title').value,
      description: this.addQuizForm.get('description').value,
      maxMarks: this.addQuizForm.get('maxMarks').value,
      numberOfQuestions: this.addQuizForm.get('numberOfQuestions').value,
      active: this.addQuizForm.get('active').value,
      category: {
        cId: this.addQuizForm.get('categoryId').value,
      },
    };

    this.quizService.addQuiz(quiz).subscribe(
      (data: any) => {
        Swal.fire('Success!', 'Quiz added', 'success').then((ex) => {
          if (ex.isConfirmed) {
            this.router.navigate(['/admin/quizzes']);
          }
        });
      },
      (err) => {
        Swal.fire('Error!', 'Quiz not added!', 'error');
      }
    );
  }
}

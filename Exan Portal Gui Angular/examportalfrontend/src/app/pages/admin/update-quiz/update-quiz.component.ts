import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryServiceService } from 'src/app/services/category-service.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css'],
})
export class UpdateQuizComponent implements OnInit {
  qId;
  categories;
  updateQuizForm: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private quizService: QuizService,
    private categoryService: CategoryServiceService,
    private snack: MatSnackBar,
    private router: Router
  ) {
    this.updateQuizForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(500),
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
      active: new FormControl(null, []),
      cId: new FormControl(null, [Validators.required, Validators.min(1)]),
    });
  }

  ngOnInit(): void {
    this.qId = this.activatedRoute.snapshot.params.qId;
    this.quizService.getQuizById(this.qId).subscribe(
      (data: any) => {
        this.updateQuizForm.get('title').setValue(data.title);
        this.updateQuizForm.get('description').setValue(data.description);
        this.updateQuizForm.get('maxMarks').setValue(data.maxMarks);
        this.updateQuizForm
          .get('numberOfQuestions')
          .setValue(data.numberOfQuestions);
        this.updateQuizForm.get('active').setValue(data.active);
        this.updateQuizForm.get('cId').setValue(data.category.cId);

      },
      (err: any) => {
        Swal.fire('Error !!', 'Error In Loading Quiz !!', 'error');
      }
    );
    this.categoryService.getCategories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (err: any) => {
        Swal.fire('Error !!', 'Category Loading Failed !!', 'error');
      }
    );
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.updateQuizForm.controls[controlName].hasError(errorName);
  };
  updateQuiz() {
    const quiz = {
      qId: this.qId,
      title: this.updateQuizForm.get('title').value,
      description: this.updateQuizForm.get('description').value,
      maxMarks: this.updateQuizForm.get('maxMarks').value,
      numberOfQuestions: this.updateQuizForm.get('numberOfQuestions').value,
      active: this.updateQuizForm.get('active').value,
      category: {
        cId: this.updateQuizForm.get('cId').value,
      },
    };

    this.quizService.updateQuiz(quiz).subscribe(
      (data: any) => {
        Swal.fire('Success!', 'Quiz Update Successfully', 'success').then(
          (ex) => {
            if (ex.isConfirmed) {
              this.router.navigate(['/admin/quizzes']);
            }
          }
        );
      },
      (err) => {
        Swal.fire('Error!', 'Quiz not Updated!', 'error');
      }
    );
  }
}

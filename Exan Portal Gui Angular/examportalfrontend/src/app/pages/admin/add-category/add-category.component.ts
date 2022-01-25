import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryServiceService } from 'src/app/services/category-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
  addCategoryForm: FormGroup;

  constructor(
    private categoryService: CategoryServiceService,
    private snack: MatSnackBar,
    private router: Router
  ) {
    this.addCategoryForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(300),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(1000),
      ])
    });
  }

  ngOnInit(): void {}
  public hasError = (controlName: string, errorName: string) => {
    return this.addCategoryForm.controls[controlName].hasError(errorName);
  };

  formSubmit() {
    this.categoryService.addCategory(this.addCategoryForm.value).subscribe(
      (data) => {
        Swal.fire('Success !', 'Category Added !', 'success').then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/admin/categories']);
          }
        });
      },
      (err) => {
        Swal.fire('Error !', 'Category Not Added !', 'error');
      }
    );
  }
}

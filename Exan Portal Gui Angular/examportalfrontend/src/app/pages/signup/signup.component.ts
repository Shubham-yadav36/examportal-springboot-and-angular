import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

// for reactive from
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  // for reactive form
  registerForm: FormGroup;

  // for reactive form only
  constructor(
    private userService: UserService,
    private snack: MatSnackBar,
    private router: Router
  ) {

    this.registerForm = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[A-Za-z0-9_-]{8,15}$'),
      ]),
      //At least 8 characters in length
      // Lowercase letters
      // Uppercase letters
      // Numbers Special characters
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        ),
      ]),
      fistName: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60),
      ]),
      lastName: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
      ]),
    });
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName);
  };

  ngOnInit(): void {}

  public user = {
    username: '',
    password: '',
    fistName: '',
    lastName: '',
    email: '',
    phone: '',
  };
  styleNum;

  formSubmit() {
    // add user function userservice
    this.userService.addUser(this.registerForm.value).subscribe(
      (data) => {
        this.snack.open(
          `Congratulation ${this.user.fistName}  ${this.user.lastName} You Are Registered !!`,
          'Close',
          {
            duration: 3000,
            verticalPosition: 'top',
          }
        );
        this.router.navigate(['/login']);
      },
      (error) => {
        this.snack.open('Username Already Exists !!', 'Close', {
          duration: 2000,
          verticalPosition: 'top',
        });
      }
    );
  }

  //Number formatting in your .ts file
  public validateR(event) {
    const pattern = /^[0-9\-]*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9\-]/g, '');
    }
  }
}

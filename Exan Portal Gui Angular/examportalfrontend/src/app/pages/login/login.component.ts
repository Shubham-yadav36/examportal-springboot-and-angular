import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private snack: MatSnackBar,
    private login: LoginService
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(150)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    });
  }
  ngOnInit(): void {

  }
  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  };
  formSubmit() {
    // call the api to get token
    this.login.generateToken(this.loginForm.value).subscribe(
      (data: any) => {
        // this.login.....
        this.login.loginUser(data.token);
        this.login.getCurrentUser().subscribe(
          (user: any) => {
            this.login.setUser(user);
            // if user is admin
            // if user is normal user
            if (this.login.getUserRole() == 'ADMIN') {
              // admin dashboard
              this.router.navigate(['admin']);
              this.login.LoginStatusSubject.next(true);
            } else if (this.login.getUserRole() == 'ROLE_USER') {
              this.router.navigate(['/']);
              this.login.LoginStatusSubject.next(true);
            } else {
              this.login.logoutUser();
              this.login.LoginStatusSubject.next(false);
            }
          },
          (error) => {
            this.snack.open('Bad Credential Try Again !!', 'Close', {
              duration: 2000,
              verticalPosition: 'top',
            });

          }
        );
      },
      (error) => {
        Swal.fire("Error !!", 'Bad Credential Try Again with Correct One !!', 'error');
      }
    );
  }
}

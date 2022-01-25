import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginData = {
    username: '',
    password: '',
  };

  constructor(
    private router: Router,
    private snack: MatSnackBar,
    private login: LoginService
  ) {}
  ngOnInit(): void {
    // for validating fields in this.login
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  formSubmit() {
    // call the api to get token
    this.login.generateToken(this.loginData).subscribe(
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
              // user dashboard
              this.router.navigate(['/']);
              this.login.LoginStatusSubject.next(true);
            } else {
              this.login.logoutUser();
              this.login.LoginStatusSubject.next(false);
            }
          },
          (error) => {
            this.snack.open('Bad Credential Try Again !!', '', {
              duration: 3000,
            });
          }
        );
      },
      (error) => {
        this.snack.open('Bad Credential Try Again !!', '', {
          duration: 3000,
        });
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'examportalfrontend';

  constructor(private login: LoginService) {}
  user;
  ngOnInit(): void {
    this.user = this.login.getUser();
    if (this.user != null) {
      this.login.validateToken(this.login.getToken()).subscribe(
        (data: any) => {
        },
        (err: any) => {
          this.login.logoutUser();
        }
      );
    }
  }
}

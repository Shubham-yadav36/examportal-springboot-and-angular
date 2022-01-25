import { Router } from '@angular/router';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  user = null;
  forLink;

  constructor(public login: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.LoginStatusSubject.asObservable().subscribe((data) => {
      this.isLoggedIn = this.login.isLoggedIn();
      this.user = this.login.getUser();
    });
    if (this.user) {
      if (this.login.getUserRole() == 'ROLE_USER') {
        this.forLink = '/user/user-profile';
      } else {
        this.forLink = '/admin/profile';
      }
    }
  }

  logout() {
    this.login.logoutUser();
    this.login.LoginStatusSubject.next(false);
    this.router.navigate(['login']);
  }
}

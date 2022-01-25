import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ResultService } from 'src/app/services/result.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private router:Router,private login: LoginService,private resultService:ResultService) {}

  // for redirect to result and show logged in user view
  user;
  ngOnInit(): void {
        this.user = this.login.getUser();
  }

  logout() {
    this.login.logoutUser();
    this.login.LoginStatusSubject.next(false);
    this.router.navigate(['login']);
  }

}

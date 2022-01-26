import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updte-profile',
  templateUrl: './updte-profile.component.html',
  styleUrls: ['./updte-profile.component.css'],
})
export class UpdteProfileComponent implements OnInit {
  user;
  username = 0;
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.username = this.activatedRoute.snapshot.params.userId;
    this.userService.getUser(this.username).subscribe((data: any) => {
      this.user = data;
      delete this.user['authorities'];
    });
  }
  formSubmit() {
    this.userService.updateUser(this.user).subscribe(
      (data) => {
        Swal.fire('Error !!', ' Something went wrong while Updated !!', 'error');
      },
      (err) => {
        Swal.fire('Updated !!', 'Updated Successfully !!', 'success').then(
          (result) => {
            if (result.isConfirmed) {
              if (this.user.id == 1) {
                this.router.navigate(['/admin/profile/']);
              } else {
                this.router.navigate(['/user/user-profile']);
              }
            }
          }
        );
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-all-user',
  templateUrl: './show-all-user.component.html',
  styleUrls: ['./show-all-user.component.css'],
})
export class ShowAllUserComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  totalPagesSize = 1;
  currentPage = 1;
  allUser;
  ngOnInit(): void {
    this.showAllUser(this.currentPage);
  }

    // to get number to object
    counter(i: number) {
      return new Array(i);
    }

    showAllUser(page){
      this.userService.allUser(page).subscribe(
        (data) => {
          console.log(data)
          this.currentPage = data[1];
          this.allUser = data[0];
          this.totalPagesSize = data[2]
        },
        (error) => {
          console.log(error);
        }
      );
    }


  deleteUser(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe(
          (data) => {
            console.log(data);
            Swal.fire('Deleted!', 'User has been deleted.', 'success');
          },
          (err) => {
            console.log(err);
            Swal.fire('Not deleted', 'User has not been deleted.', 'error');
          }
        );
      }
    });
  }
}

import { ContactusService } from './../../../services/contactus.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css'],
})
export class ContactusComponent implements OnInit {
  constructor(
    private router: Router,
    private contactusService: ContactusService,
    private snack: MatSnackBar
  ) {}
  contactus = {
    name: '',
    email: '',
    description: '',
  };

  ngOnInit(): void {}
  submitform() {
    if (
      this.contactus.name == '' ||
      this.contactus.email == '' ||
      this.contactus.description == ''
    ) {
      this.snack.open('Field can not be empty !!', 'cancel', {
        duration: 2000,
      });
    } else {
      this.contactusService.addContactus(this.contactus).subscribe(
        (data) => {
          Swal.fire(
            'Success !!',
            'Thanks to contactus, answer will be shortly given by email address',
            'success'
          ).then((result)=>{
            if(result.isConfirmed){
              this.router.navigate(['/']);
            }
          });
        },
        (err) => {
          Swal.fire('Error !!', 'Error When Insert query', 'error');
        }
      );
    }
  }
}

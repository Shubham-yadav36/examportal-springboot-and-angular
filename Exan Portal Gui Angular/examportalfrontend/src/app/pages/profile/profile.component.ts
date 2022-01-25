import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { FileuploadService } from './../../services/fileupload.service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user = null;
  file: File = null;
  shortLink: string = "";
    loading: boolean = false;
  constructor(private login: LoginService,private fileUploadService:UserService,private router:Router) {}

  ngOnInit(): void {
    // this.user = this.login.getUser()
    this.login.getCurrentUser().subscribe((data) => {
      this.user = data;
    });
  }
  // On file Select
  onChange(event) {
    this.file = event.target.files[0];
  }

  // OnClick of button Upload
  onUpload() {
    console.log(this.file);
    this.fileUploadService.upload(this.file,this.user.id).subscribe(
      (data: any) => {
        this.router.navigate(['/user/user-profile']);
      },
      (error)=>{
        console.log(error);
      }
    );
  }
}

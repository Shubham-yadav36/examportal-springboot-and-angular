import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResultService } from 'src/app/services/result.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-quizzes-of-user',
  templateUrl: './show-quizzes-of-user.component.html',
  styleUrls: ['./show-quizzes-of-user.component.css']
})
export class ShowQuizzesOfUserComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,private resultService:ResultService) { }
  results;
  userId;
  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.params.userId;
    this.resultService.getResultByUser(this.userId).subscribe(
      (data:any) =>{
        this.results = data;
      },
      (err:any) =>{
        Swal.fire("Error !!","Error While Loading Results",'error')
      }
    );
  }

}

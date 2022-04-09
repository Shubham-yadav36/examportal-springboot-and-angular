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
  currentPage = 0;
  totalPagesSize = 0;
  size = 2;
  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.params.userId;
    this.getResultOfUserById(this.userId,this.currentPage,this.size);
  }

  getResultOfUserById(userId,page,size){
    this.resultService.getResultByUser(userId,page,size).subscribe(
      (data:any) =>{
        this.results = data.data;
        this.currentPage = data.currentPage;
        this.totalPagesSize= data.totalPage
      },
      (err:any) =>{
        Swal.fire("Error !!","Error While Loading Results",'error')
      }
    );
  }
  // to get number to object
  counter(i: number) {
    return new Array(i);
  }

}

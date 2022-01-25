import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  constructor(private quizService:QuizService) { }

  quizzes=[];

  ngOnInit(): void {
    this.quizService.getAllQuizzes().subscribe(
      (data:any) => {
        this.quizzes = data;
      },
      (err) => {
        Swal.fire('Error !!',"Quiz loading failed !",'error')
      }
    )
  }

  deleteQuiz(qId){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.quizService.deleteQuiz(qId).subscribe(
          (data) => {

          },
          (err) => {
            this.quizzes = this.quizzes.filter(q => q.qId != qId);
            console.log()
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
        );
      }
    })

  }

}

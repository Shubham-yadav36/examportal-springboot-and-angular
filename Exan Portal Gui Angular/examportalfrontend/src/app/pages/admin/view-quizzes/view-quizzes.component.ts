import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  constructor(private quizService: QuizService) { }

  quizzes = [];
  currentPage = 0;
  totalPagesSize = 0;
  size = 3;
  ngOnInit(): void {
   this.getAllQuizzes(this.currentPage,this.size);
  }

  getAllQuizzes(page,size){
    this.quizService.getAllQuizzes(page,size).subscribe(
      (data: any) => {
        this.quizzes = data.data;
        this.currentPage = data.currentPage;
        this.totalPagesSize = data.totalPage
      },
      (err) => {
        Swal.fire('Error !!', "Quiz loading failed !", 'error')
      }
    )
  }
    // to get number to object
    counter(i: number) {
      return new Array(i);
    }

  deleteQuiz(qId) {
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

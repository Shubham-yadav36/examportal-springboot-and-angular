import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  quidId;
  quiz;

  constructor(private activatedRoute: ActivatedRoute,
    private quizService:QuizService,
    private router:Router) { }

  ngOnInit(): void {
    this.quidId = this.activatedRoute.snapshot.params.qId;
    this.quizService.getQuizById(this.quidId).subscribe(
      (data: any) => {
        this.quiz = data
      },
      (err: any) => {
        Swal.fire("Error !!","Error when loading quiz !!",'error')
      }
    );
  }

  startQuiz(){
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to start this quiz!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, start'
    }).then((result) => {
      if (result.isConfirmed){
        this.router.navigate(['/start-quiz/'+this.quidId])
      }
    });
  }

}

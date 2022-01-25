import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-logged-user-display',
  templateUrl: './logged-user-display.component.html',
  styleUrls: ['./logged-user-display.component.css'],
})
export class LoggedUserDisplayComponent implements OnInit {
  constructor(private quizService: QuizService) {}

  dQuiz=[];
  ngOnInit(): void {
    this.quizService.DisabledQuiz().subscribe(
      (data: any) => {
        this.dQuiz = data;
      }
    )
  }
}

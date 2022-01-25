import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css'],
})
export class LoadQuizComponent implements OnInit {
  catId = 0;
  quizzies = [];
  searchedQzuizzes;
  totalPagesSize = 1;
  currentPage = 1;
  constructor(
    private activatedRoute: ActivatedRoute,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.catId = params.catId;
      if (this.catId == 0) {
        this.quizService.getTotalPageSizeForAllQuiz().subscribe((data: any) => {
          this.totalPagesSize = data;
        });
        this.quizService.getAllActiveQuizzes().subscribe(
          (data: any) => {
            this.quizzies = data;
          },
          (err) => {
            Swal.fire('Error !!', 'Error When loading Quizzes', 'error');
          }
        );
      } else {
        this.totalPagesSize=0;
        this.quizService.getActiveQuizByCategory(this.catId).subscribe(
          (data: any) => {
            this.quizzies = data;
          },
          (err) => {
            Swal.fire('Error !!', 'Error When loading Quizzes', 'error');
          }
        );
      }
    });
  }

  // for searching
  search(query) {
    if (query.target.value.length > 0) {
      this.quizService.getSearchActiveQuizzes(query.target.value).subscribe(
        (data) => {
          this.searchedQzuizzes = data;
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.searchedQzuizzes = null;
    }
  }

  // paginations
  pagination(page) {
    console.log(page);
    if (this.catId == 0) {
      this.quizService.getAllActiveQuizzesForPagination(page).subscribe(
        (data: any) => {
          this.currentPage = data[1];
          this.quizzies= data[0];
          console.log(data[0]);
        },
        (err) => {
          Swal.fire('Error !!', 'Error When loading Quizzes', 'error');
        }
      );
    }
  }

  // to get number to object
  counter(i: number) {
    return new Array(i);
  }
}

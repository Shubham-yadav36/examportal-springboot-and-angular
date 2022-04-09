import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResultService } from 'src/app/services/result.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-result',
  templateUrl: './show-result.component.html',
  styleUrls: ['./show-result.component.css']
})
export class ShowResultComponent implements OnInit {

  userId;
  results = [];
  currentPage = 0;
  totalPagesSize;
  size = 2;
  constructor(private activatedRoute: ActivatedRoute, private resultService: ResultService, private router: Router) { }

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.params.userId;
    this.getResultByUserId(this.userId, this.currentPage, this.size)
  }
  getResultByUserId(userId, page, size) {
    this.resultService.getResultByUser(userId, page, size).subscribe(
      (data: any) => {
        this.results = data.data;
        this.currentPage = data.currentPage;
        this.totalPagesSize = data.totalPage;
        console.log(data)
      },
      (err: any) => {
        Swal.fire("Error !!", "Error While Loading Results", 'error')
      }
    );
  }
  generateResult(resultId) {
    this.router.navigate(['/generate-certificate/' + resultId]);
  }
  // to get number to object
  counter(i: number) {
    return new Array(i);
  }
}

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
  results= [];
  constructor(private activatedRoute:ActivatedRoute,private resultService:ResultService,private router:Router) { }

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
  generateResult(resultId){
    this.router.navigate(['/generate-certificate/'+resultId]);
  }

}

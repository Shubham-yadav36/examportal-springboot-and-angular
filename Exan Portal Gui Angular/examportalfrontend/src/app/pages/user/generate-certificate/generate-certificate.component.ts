import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResultService } from 'src/app/services/result.service';

@Component({
  selector: 'app-generate-certificate',
  templateUrl: './generate-certificate.component.html',
  styleUrls: ['./generate-certificate.component.css'],
})
export class GenerateCertificateComponent implements OnInit {
  resultId;
  // for certificate
  result;

  constructor(
    private locationStrategy: LocationStrategy,
    private activatedRoute: ActivatedRoute,
    private resultService: ResultService
  ) {}

  ngOnInit(): void {
    this.preventBackButtonClick();
    this.resultId = this.activatedRoute.snapshot.params.rId;
    this.resultService.getResult(this.resultId).subscribe(
      (data:any) => {
        this.result = data;
    });
  }

  print() {
    window.print();
  }

  preventBackButtonClick() {
    history.pushState(null,null,location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null,null,location.href);
    });
  }
}

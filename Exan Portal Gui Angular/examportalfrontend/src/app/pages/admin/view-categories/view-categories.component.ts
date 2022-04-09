import { Component, OnInit } from '@angular/core';
import { CategoryServiceService } from 'src/app/services/category-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categories = [];
  currentPage = 0;
  totalPagesSize = 0;
  size = 5;
  constructor(private categoryService: CategoryServiceService) { }

  ngOnInit(): void {
    this.getCategories(this.currentPage, this.size);
  }

  getCategories(page, size) {
    this.categoryService.getCategoriesPage(page, size).subscribe(
      (data: any) => {
        this.categories = data.data;
        this.currentPage = data.currentPage;
        this.totalPagesSize = data.totalPage;
        console.log(data)
        console.log(this.currentPage + " "+this.totalPagesSize)
      },
      (err) => {
        Swal.fire("Error !!", "Error When loading !", 'error');

      }
    );

  }
   // to get number to object
   counter(i: number) {
    return new Array(i);
  }
}

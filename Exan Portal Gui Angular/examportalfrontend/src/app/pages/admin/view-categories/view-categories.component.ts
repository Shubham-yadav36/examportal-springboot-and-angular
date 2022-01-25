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

  constructor(private categoryService: CategoryServiceService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      (data:any) =>{
        this.categories = data;
        console.log(data);
      },
      (err) =>{
        Swal.fire("Error !!","Error When loading !",'error');
        console.log(err);
      }
    );
  }


}

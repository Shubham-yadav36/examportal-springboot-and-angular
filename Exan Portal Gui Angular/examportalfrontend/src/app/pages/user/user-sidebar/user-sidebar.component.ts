import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryServiceService } from 'src/app/services/category-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {

  categories = [];
  catId;
  constructor(private categoryService: CategoryServiceService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      (data:any) => {
        this.categories = data;
      },
      (err) => {Swal.fire('Error !!','Error When Loading Categories !!','error')}
    );
  }

}

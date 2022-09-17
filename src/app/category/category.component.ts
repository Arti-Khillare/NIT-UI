import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category/category.service';
import { Category, CategoryResponse } from '../app.interface';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  public category: Category[] | undefined;
  pageSize: number = 10;
  pageNumber: number = 1;
  totalCount: any;
  constructor(private _category: CategoryService) {}

  ngOnInit(): void {
    this.getCategoryList();
  }

  getCategoryList() {
    this._category.getCategory(this.pageNumber, this.pageSize).subscribe((category: CategoryResponse) => {
      this.totalCount = category.totalCount;
      this.category = category.data;
    });
  }

  deleteCategory(id: string) {
    if (confirm('Do you really want to delete this record?')) {
      this._category.deleteCategory(id).subscribe(() => {
        this.getCategoryList();
      });
    }
  }
  onPageChange(page: any) {
    this.pageNumber = page;
    this.getCategoryList();
  }
}

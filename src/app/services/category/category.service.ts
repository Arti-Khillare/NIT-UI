import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { categoryForm } from 'src/app/app.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private path: string = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getCategory = (pageNumber: number=1, pageSize: number=10) =>
    this.http.get(
      `${this.path}/category?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );

  getOneCategory = (id: string) => this.http.get(`${this.path}/category/${id}`);

  creatCategory = (data: categoryForm) =>
    this.http.post(`${this.path}/category`, data);

  updateCategory = (data: categoryForm, id: string) =>
    this.http.put(`${this.path}/category/${id}`, data);

  deleteCategory = (id: string) =>
    this.http.delete(`${this.path}/category/${id}`);
}

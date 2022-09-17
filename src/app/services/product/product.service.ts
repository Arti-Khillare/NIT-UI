import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private path: string = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getProduct = (pageNumber: number, pageSize: number) =>
    this.http.get(
      `${this.path}/product?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );

  getOneProduct = (id: string) => this.http.get(`${this.path}/product/${id}`);

  creatProduct = (data: any) => this.http.post(`${this.path}/product`, data);

  updateProduct = (data: any, id: string) =>
    this.http.put(`${this.path}/product/${id}`, data);

  deleteProduct = (id: string) =>
    this.http.delete(`${this.path}/product/${id}`);
}

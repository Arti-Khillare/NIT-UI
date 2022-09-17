import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: any;
  errorMessage: string = '';
  pageSize:number=10;
  pageNumber:number=1;
  totalCount:any;
  constructor(private _product: ProductService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this._product.getProduct(this.pageNumber, this.pageSize).subscribe(
      (data: any) => {
        this.products = data.data;
        // console.log(data);
        this.totalCount=data.totalCount;
        console.log('Here data :- ',data, this.totalCount);
      },
      (err) => {
        this.errorMessage = err.error.msg;
      }
    );
  }

  deleteProduct(id: string) {
    if (confirm('Do you really want to delete this record?')) {
      this._product.deleteProduct(id).subscribe(() => {
        this.getAllProducts();
      });
    }
  }

  onPageChange(page:any){
    this.pageNumber=page;
    this.getAllProducts();
  }
}

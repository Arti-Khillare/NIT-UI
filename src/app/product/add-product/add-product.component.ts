import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { urlParam } from 'src/app/app.interface';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  public productForm!: FormGroup;
  successMessage: string = '';
  loading: boolean = false;
  category?: any[];
  errorMessage: string = '';
  productId: string = '';

  constructor(
    private fb: FormBuilder,
    private _category: CategoryService,
    private _product: ProductService,
    private route: Router,
    private _route: ActivatedRoute
  ) {
    this._route.params.subscribe((data: any) => {
      this.productId = data.id;
      this.createProductForm(this.productId);
    });
  }

  loadCategory() {
    this._category.getCategory().subscribe((data: any) => {
      this.category = data.data;
    });
  }

  ngOnInit(): void {
    this.loadCategory();
  }

  createProductForm(id: any) {
    if (id) {
      this._product.getOneProduct(id).subscribe((data: any) => {
        this.productForm = this.fb.group({
          productName: [data.data.productName],
          category: [data.data.categoryId],
          description: [data.data.description],
          productNumber: [data.data.productNumber],
        });
      });
    }
    this.productForm = this.fb.group({
      productName: '',
      category: '',
      description: '',
      productNumber: '',
    });
  }

  saveForm() {
    this.productForm.value.categoryId = this.productForm.value.category._id;

    const observable = this.productId
      ? this._product.updateProduct(this.productForm.value, this.productId)
      : this._product.creatProduct(this.productForm.value);

    observable.subscribe(
      (data:any) => {
        this.loading = false;
        this.successMessage = data.message;
        this.redirect();
      },
      (error) => {
        console.log(error);
        this.errorMessage = error.error.message;
      }
    );
  }

  redirect() {
    setTimeout(() => {
      this.successMessage = '';
      this.route.navigate(['product']);
    }, 1000);
  }
}

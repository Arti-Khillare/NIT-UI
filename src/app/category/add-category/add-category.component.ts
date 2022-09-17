import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryResponseSingle, urlParam } from 'src/app/app.interface';
import { CategoryService } from 'src/app/services/category/category.service';
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  public categoryForm!:FormGroup;
  public loading:boolean = false;
  successMessage:string="";
  categoryId:string | undefined='' ;

  constructor(private fb:FormBuilder, private _category:CategoryService, private route:Router, private _route:ActivatedRoute) {
console.log('activated route :- ', _route);
_route.params.subscribe((data:urlParam)=>{
  this.categoryId = data.id; 
    this.createCategoryForm(this.categoryId); 
})
   }

  ngOnInit(): void {
    
  }

  createCategoryForm = (id:string | undefined) =>{
    if(id)
    {
      this._category.getOneCategory(id).subscribe((cat:CategoryResponseSingle | undefined)=>{
        this.categoryForm = this.fb.group({
          categoryName:[cat?.data?.categoryName], subCategory:[cat?.data?.subCategory], description:[cat?.data?.description]
        })
      });
    }
    this.categoryForm = this.fb.group({
      categoryName:'', subCategory:'', description:''
    })
  }

  saveForm(){
    this.loading = true;
    const {value:category} =this.categoryForm;
    const observable = this.categoryId?this._category.updateCategory(category,this.categoryId):this._category.creatCategory(category);
    
    observable.subscribe((data:any)=>{
      this.loading = false;
      this.successMessage = data.message;
      this.redirect();
    })
  }

  redirect(){
      setTimeout(()=>{
        this.successMessage = "";
        this.route.navigate(['category']);
      },1000)
  }

}

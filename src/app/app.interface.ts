interface Category {
  _id: string;
  categoryName?: string;
  description?: string;
  subCategory?: string;
}

interface CategoryResponse {
  message?: string;
  status?: boolean;
  data?: Category[];
  totalCount?:number;
}

interface CategoryResponseSingle {
  message?: string;
  status?: boolean;
  data?: Category;
}

interface categoryForm{
  categoryName?:string; 
  subCategory?:string;
  description?:string;
}

interface urlParam{
  id?:string; 
}


export { Category, CategoryResponse, categoryForm,urlParam, CategoryResponseSingle };

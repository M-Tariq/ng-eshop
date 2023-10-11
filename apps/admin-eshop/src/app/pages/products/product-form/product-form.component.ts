import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService, Category, Product, ProductsService } from '@inspirelogix/products';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'admin-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  form: FormGroup;
  isEditMode: Boolean;
  id: string;
  categories: Category[];
  text: string = 'he';
  imageDisplay: String | ArrayBuffer;
  constructor(private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = new FormGroup({});
    this.isEditMode = false;
    this.categories = [];
    this.id = '';
    this.imageDisplay = '';

  }
  ngOnInit() {
    this._checkEditMode();
    this._getCategories();
    this.form = this.formBuilder.group(
      {
        name: ["", Validators.required],
        brand: ["", Validators.required],
        description: ["", Validators.required],
        richDescription: ["", Validators.required],
        image: ["", Validators.required],
        category: ["", Validators.required],
        price: ["", Validators.required],
        countInStock: [0, Validators.required],
        isFeatured: [false, Validators.required],
      }
    );
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill all required fields' });
      this.form.markAllAsTouched();
      return;
    }

    const product = {
      name: this.productForm['name'].value,
      brand: this.productForm['brand'].value,
      description: this.productForm['description'].value,
      richDescription: this.productForm['richDescription'].value,
      category: this.productForm['category'].value,
      price: this.productForm['price'].value,
      countInStock: this.productForm['countInStock'].value,
      isFeatured: this.productForm['isFeatured'].value,
      ...(this.productForm['image'].value && { image: this.productForm['image'].value })
    };


    let formData = new FormData();
    Object.entries(this.productForm).forEach(([key, value]) => {
      if (value.value) {
        formData.append(key, value.value);
      }
    });

    if (this.isEditMode) {
      this._updateProduct(formData);

    } else {
      this._addProduct(formData);
    }
  }

  private _addProduct(product: FormData) {
    this.productsService.addProduct(product).subscribe((res) => {
      if (res?.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category Added Successfully' });
        this.navigateToProductsListing();
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went Wrong!' });
      }
    },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message ?? "Something went Wrong!" });
      });
  }

  private _updateProduct(product: FormData) {
    this.productsService.updateProduct(product, this.id).subscribe((res) => {
      if (res?.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category Updated Successfully' });
        this.navigateToProductsListing();
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went Wrong!' });
      }
    },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message ?? "Something went Wrong!" });
      });
  }


  navigateToProductsListing() {
    this.router.navigate(['products']);

  }

  get productForm() {
    return this.form.controls;
  }

  private _checkEditMode() {
    this.id = this.route.snapshot.paramMap.get('id') || '';

    if (this.id) {
      this.isEditMode = true;

      this.productsService.getProduct(this.id).subscribe({
        next: (product) => {
          this.productForm['name'].setValue(product?.name);
          this.productForm['brand'].setValue(product?.brand);
          this.productForm['description'].setValue(product?.description);
          this.productForm['richDescription'].setValue(product?.richDescription);
          this.productForm['countInStock'].setValue(product?.countInStock);
          this.productForm['price'].setValue(product?.price);
          this.productForm['isFeatured'].setValue(product?.isFeatured);
          this.productForm['category'].setValue(product?.category);
          this.productForm['image'].setValidators([]);
          //after dynamic validation changes we need to update value and validity
          this.productForm['image'].updateValueAndValidity();

          this.imageDisplay = product?.image || '';
        },
        error: (error) => {
          // Handle the errora
        },
        complete: () => {
          // Observable completed
        },
      });
    } else {
      this.isEditMode = false;
    }
  }

  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ image: file });
      this.form.get("image")?.updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result || "";
      }
      fileReader.readAsDataURL(file);
    }
  }
}


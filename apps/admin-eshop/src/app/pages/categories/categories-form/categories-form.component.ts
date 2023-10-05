import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category } from '@inspirelogix/products';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent {
  form: FormGroup;
  isEditMode: Boolean;
  id: string;
  constructor(private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = new FormGroup({});
    this.isEditMode = false;
    this.id = '';
  }
  ngOnInit() {
    this._checkEditMode();
    this.form = this.formBuilder.group(
      {
        name: ["", Validators.required],
        icon: ["", Validators.required],
      }
    );
  }

  onSubmit() {
    if (this.form.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill all required fields' });
      this.form.markAllAsTouched();
      return;
    }

    const category = {
      name: this.categoryForm['name'].value,
      icon: this.categoryForm['icon'].value,
    };
    if (this.isEditMode) {
      this._updateCategory(category);

    } else {
      this._addCategory(category);
    }
  }

  private _addCategory(category: Category) {
    this.categoriesService.addCategory(category).subscribe((res) => {
      if (res?.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category Added Successfully' });
        this.navigateToCategoryListing();
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went Wrong!' });
      }
    },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message ?? "Something went Wrong!" });
      });
  }

  private _updateCategory(category: Category) {
    this.categoriesService.updateCategory(category, this.id).subscribe((res) => {
      if (res?.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category Updated Successfully' });
        this.navigateToCategoryListing();
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went Wrong!' });
      }
    },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message ?? "Something went Wrong!" });
      });
  }
  navigateToCategoryListing() {
    this.router.navigate(['categories']);

  }

  get categoryForm() {
    return this.form.controls;
  }

  private _checkEditMode() {
    this.id = this.route.snapshot.paramMap.get('id') || '';

    if (this.id) {
      this.isEditMode = true;

      this.categoriesService.getCategory(this.id).subscribe({
        next: (category) => {
          this.categoryForm['name'].setValue(category?.name);
          this.categoryForm['icon'].setValue(category?.icon);
        },
        error: (error) => {
          // Handle the error
        },
        complete: () => {
          // Observable completed
        },
      });
    } else {
      this.isEditMode = false;
    }
  }
}

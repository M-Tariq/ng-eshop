import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@inspirelogix/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
})
export class CategoriesListComponent {
  constructor(private categoriesService: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router) { }
  categories: Category[] = [];

  ngOnInit(): void {
    this._getCategories();
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe((cats) => {
      this.categories = cats;
    });
  }
  navigateToAddCategory() {
    this.router.navigate(['categories/form']);
  }

  onDeleteCategory(id: String) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this Category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._deleteCategory(id);
      },
      reject: () => {
      }
    });

  }

  onEditCategory(id: String) {
    this.router.navigateByUrl(`categories/form/${id}`);
  }


  private _deleteCategory(id: String) {
    this.categoriesService.deleteCategory(id).subscribe((res) => {
      if (res?.success) {
        this._getCategories();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category Deleted Successfully' });
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "Something went Wrong!" });
      }
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message ?? "Something went Wrong!" });
    });
  }
}

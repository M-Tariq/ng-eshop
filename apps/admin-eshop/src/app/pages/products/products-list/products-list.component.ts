import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductsService } from '@inspirelogix/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'bluebits-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent {
  products: Product[] = [];

  constructor(
    private productsService: ProductsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._getProducts();
  }

  private _getProducts() {
    this.productsService.getProducts().subscribe((products) => {
      console.log(products);
      this.products = products;
    });
  }
  navigateToAddProduct() {
    this.router.navigate(['products/form']);
  }

  onDeleteProduct(id: String, name: string) {
    this.confirmationService.confirm({
      message: `Do you want to delete ${name} Product?`,
      header: 'Delete Product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._deleteProduct(id);
      },
      reject: () => {
      }
    });

  }

  onEditProduct(id: String) {
    this.router.navigateByUrl(`products/form/${id}`);
  }


  private _deleteProduct(id: String) {
    this.productsService.deleteProduct(id).subscribe((res) => {
      if (res?.success) {
        this._getProducts();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product Deleted Successfully' });
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "Something went Wrong!" });
      }
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message ?? "Something went Wrong!" });
    });
  }
}

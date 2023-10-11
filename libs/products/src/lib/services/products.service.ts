import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  API_URL = environment.API_URL + `/products`;
  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API_URL);
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.API_URL}/${id}`);
  }

  addProduct(product: FormData): Observable<any> {
    return this.http.post<Product>(this.API_URL, product);
  }

  updateProduct(product: FormData, id: string): Observable<any> {
    return this.http.put<Product>(`${this.API_URL}/${id}`, product);
  }

  deleteProduct(id: String): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/${id}`);
  }
}

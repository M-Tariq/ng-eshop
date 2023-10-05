import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>("http://localhost:3000/api/v1/categories");
  }

  getCategory(id: string): Observable<Category> {
    return this.http.get<Category>(`http://localhost:3000/api/v1/categories/${id}`);
  }

  addCategory(category: Category): Observable<any> {
    return this.http.post<Category>("http://localhost:3000/api/v1/categories", category);
  }

  updateCategory(category: Category, id: string): Observable<any> {
    return this.http.put<Category>(`http://localhost:3000/api/v1/categories/${id}`, category);
  }

  deleteCategory(id: String): Observable<any> {
    return this.http.delete<Object>(`http://localhost:3000/api/v1/categories/${id}`);
  }
}

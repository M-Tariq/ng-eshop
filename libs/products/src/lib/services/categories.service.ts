import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  API_URL = environment.API_URL + `/categories`;
  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.API_URL);
  }

  getCategory(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.API_URL}/${id}`);
  }

  addCategory(category: Category): Observable<any> {
    return this.http.post<Category>(this.API_URL, category);
  }

  updateCategory(category: Category, id: string): Observable<any> {
    return this.http.put<Category>(`${this.API_URL}/${id}`, category);
  }

  deleteCategory(id: String): Observable<any> {
    return this.http.delete<Object>(`${this.API_URL}/${id}`);
  }
}

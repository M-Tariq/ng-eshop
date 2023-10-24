import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API_URL = environment.API_URL + `/users`;
  constructor(private http: HttpClient) { }

  login(email: String, password: String): Observable<User> {
    return this.http.post<User>(this.API_URL, { email, password });
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.API_URL);
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/${id}`);
  }

  addUser(User: FormData): Observable<any> {
    return this.http.post<User>(this.API_URL, User);
  }

  updateUser(User: FormData, id: string): Observable<any> {
    return this.http.put<User>(`${this.API_URL}/${id}`, User);
  }

  deleteUser(id: String): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/${id}`);
  }
}

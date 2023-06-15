import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable } from 'rxjs';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private baseUrl = 'http://localhost:1818';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/all`);
  }

  addUser(user: User): Observable<User> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<User>(`${this.baseUrl}/add`, JSON.stringify(user), { headers });
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }
  updateUser(id: number|undefined,user:User): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}`,user);
  }
  oneUser(id:number|undefined){
    return this.http.get<User>(`${this.baseUrl}/one/${id}`)
  }
}

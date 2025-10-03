import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login, LoginResponse } from 'src/app/models/login/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:3000/login'

  constructor(private http:HttpClient) { }

  getLogin(login:Login): Observable<LoginResponse> {
    console.log(login)
    return this.http.post<LoginResponse>(this.apiUrl, login);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ResponseToken } from '../interfaces/responseToken';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private base_url = environment.apiUrl;

  constructor(private http:HttpClient) { }

  onLogin(email: string, password:string):Observable<{token: string}>{
    return this.http.post<{token: string}>(`${this.base_url}/api/auth/login`, {email, password})
    .pipe(
      tap((response) => {
        const decoded = jwtDecode<ResponseToken>(response.token);
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', decoded.role);
        localStorage.setItem('userName', decoded.username);
      })
    )
  }
}

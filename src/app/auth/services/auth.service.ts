import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable, tap } from 'rxjs';
import { ResponseToken } from 'src/app/components/chat/chat.component';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private readonly apiUrl = 'http://localhost:3400/api/auth';
    constructor(private http: HttpClient) { }

    login(email: string, password: string):Observable<{ token: string }> {
        return this.http.post<{token: string}>(`${this.apiUrl}/login`, { email, password }).pipe(
            tap(response => {
                const decodeToken = jwtDecode<ResponseToken>(response.token);
                localStorage.setItem('token', response.token);
                localStorage.setItem('role', decodeToken.role);
            })
        )
    }

    // renewToken():Observable<{ token: string }> {
    //     return this.http.post<{token: string}>(`${this.apiUrl}/renewToken`, {});
    // }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private readonly apiUrl = 'http://localhost:3400/api/auth';
    constructor(private http: HttpClient) { }

    login(email: string, password: string):Observable<{ token: string }> {
        return this.http.post<{token: string}>(`${this.apiUrl}/login`, { email, password });
    }
}
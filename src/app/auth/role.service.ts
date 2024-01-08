import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  get userRole(): string {
    return localStorage.getItem('role') || '';
  }

  isAdmin(): boolean {
    console.log(this.userRole)
    return this.userRole === 'admin';
  }

}

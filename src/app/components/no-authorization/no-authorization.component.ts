import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ResponseToken } from '../chat/chat.component';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-no-authorization',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p class="text-white 4xl text-center mt-5">Usuario {{userData?.username}} con Role: {{userData?.role}} No esta Authorizado</p>`,
  styleUrls: ['./no-authorization.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoAuthorizationComponent {
  userData: ResponseToken | null = null;

  constructor() {
    const token = localStorage.getItem('token');
    if (token) {
      this.userData = jwtDecode<ResponseToken>(token);
    }
  }
}

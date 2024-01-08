import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private authService: AuthService,private router: Router){}

  onLogin() {
    try {      
      this.authService.onLogin(this.email, this.password).subscribe(resp => {
        console.log(resp);
        this.router.navigateByUrl('/chat');
      })
    } catch (error) {
      console.log('ocurrio un error');
    }
  }
}

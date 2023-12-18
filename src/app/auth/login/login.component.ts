import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { SocketService } from 'src/app/services/socket.service';
import { FormsModule } from '@angular/forms';
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
  email: string = ''
  password: string = ''

  constructor(private authService: AuthService, private socketService: SocketService,private router: Router) { }


  onLogin(){
    this.authService.login(this.email, this.password).subscribe(
      {
        next:(data) => {
          localStorage.setItem('token', data.token);
          // conexion del socket usando el token 
          this.socketService.connect(data.token);
          console.log(data.token);
          this.router.navigate(['/chat']);
        },
        error: (error) => console.log(error)
      }
    )
  }
}

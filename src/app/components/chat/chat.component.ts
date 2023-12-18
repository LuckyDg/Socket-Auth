import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { SocketService } from 'src/app/services/socket.service';


export interface ResponseToken {
  username: string,
  role: string,
  iat: number,
  exp: number
}

export interface ChatMessage {
  text: string,
  sender: string
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent {

  messages: ChatMessage[] = [];
  message = '';

  userData: ResponseToken | null = null;

  constructor(
    private socketService: SocketService,
    private cd: ChangeDetectorRef
  ) {
    const token = localStorage.getItem('token');

    if (token) {
      this.userData = jwtDecode<ResponseToken>(token);
    }
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (token) {
      this.socketService.connect(token);
    }

    if (token) {
      this.socketService.onMessage().subscribe((msg: ChatMessage) => {
        this.messages.push(msg);
        this.cd.markForCheck();
      });
    } else {
      console.log("No hay Token disponible!");
    }
  }

  ngOnDestroy(): void {
    this.socketService.disconnect();
  }

  sendMessage(): void {
    if (this.message.trim()) {
      this.socketService.sendMessage(this.message);
      this.message = '';
    }
  }
}

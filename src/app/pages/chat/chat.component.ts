import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RoleService } from 'src/app/auth/role.service';
import { Message } from 'src/app/interfaces/message.interface';
import { SocketService } from 'src/app/services/socket.service';

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
export class ChatComponent implements OnInit, OnDestroy {
  message = '';
  messages: Message[] = [];

  statusConnection!: boolean;
  userRole: string = '';
  username = localStorage.getItem('userName');

  constructor(
    private roleService: RoleService,
    private socketService: SocketService,
    private cd: ChangeDetectorRef,
    private router: Router) {
    this.socketService.isConnected.subscribe((connected) => {
      this.statusConnection = connected;
      this.cd.markForCheck();
      console.log(this.statusConnection);
    })
    this.userRole = this.roleService.userRole;
  }

  get isAdmin(): boolean {
    return this.roleService.isAdmin();
  }

  ngOnInit(): void {

    const token = localStorage.getItem('token');

    if (token) {
      this.socketService.connect(token);
      this.onMessage();
      this.onRecentMessages();
    } else {
      this.redirectToLogin();
    }

  }

  sendMessage() {
    const token = localStorage.getItem('token');
    if (!token) {
      // Manejar la ausencia del token
      this.redirectToLogin();
      return;
    }

    if (this.message.trim()) {
      this.socketService.sendMessage(this.message);
      this.message = '';
    }
  }

  onMessage() {
    this.socketService.onMessage().subscribe((msg: Message) => {
      this.messages.push(msg);
      this.cd.markForCheck();
      this.scrollToBottom();
    })
  }

  redirectToLogin() {
    this.socketService.disconnect();
    this.router.navigate(['/login']);
  }

  onRecentMessages() {
    this.socketService.onRecentMessages().subscribe((recentMessages: Message[]) => {
      // Asegúrate de que los mensajes recientes estén ordenados cronológicamente
      recentMessages = recentMessages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

      // Agregar los mensajes recientes al final de la lista
      this.messages = [...this.messages, ...recentMessages];
      this.cd.markForCheck();

      // Desplazarse hasta el final del contenedor de mensajes
      this.scrollToBottom();
    });
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      const container = document.querySelector('.messages');
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }, 100);
  }

  ngOnDestroy(): void {
    this.socketService.disconnect();
  }

}

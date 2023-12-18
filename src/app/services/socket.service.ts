import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket, io } from 'socket.io-client';
import { ChatMessage } from '../components/chat/chat.component';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket!: Socket;

  connect(token: string) {
    this.socket = io('http://localhost:3400', { query: { token } })

    this.socket.on('connect', () => {
      console.log('Conectado a WebSocket', this.socket.id);
    });

    this.socket.on('connect_error', (error) => {
      console.error('Error de conexión a WebSocket', error);
    });

    this.socket.on('error', (error) => {
      console.error('Error en WebSocket', error);
    });

  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  sendMessage(message: string) {
    if (this.socket && this.socket.connected) {
      this.socket.emit('message', message);
    } else {
      console.error('Intento de enviar mensaje sin conexión socket activa.');
    }
  }

  onMessage(): Observable<ChatMessage> {
    return new Observable<ChatMessage>((observer) => {
      if (this.socket) {
        this.socket.on('message', (message: ChatMessage) => observer.next(message));
      } else {
        console.log('Socket no connection');
      }
    });
  }
}

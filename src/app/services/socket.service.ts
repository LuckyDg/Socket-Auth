import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Socket, io } from 'socket.io-client';
import { ChatMessage } from '../components/chat/chat.component';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket!: Socket;
  private _isConnected = new BehaviorSubject<boolean>(false);
  public isConnected = this._isConnected.asObservable();

  connect(token: string) {
    this.socket = io('http://localhost:3400', { query: { token } })

    this.socket.on('connect', () => {
      console.log('Conectado a WebSocket', this.socket.id);
      this._isConnected.next(true);
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado de WebSocket');
      this._isConnected.next(false);
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
    if (this.socket.connected) {
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

  handleDisconnect(reconnect: () => void){
    this.socket.on('disconnect', (reason) =>{
      if(reason === 'io server disconnect'){
        reconnect();
      }
    })
  }
}

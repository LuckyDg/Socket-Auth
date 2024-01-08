import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Socket, io } from 'socket.io-client';
import { environment } from 'src/environments/environment.development';
import { Message } from '../interfaces/message.interface';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private ws = environment.apiUrl;

  private socket!: Socket;
  private _isConnected = new BehaviorSubject<boolean>(false);
  public isConnected = this._isConnected.asObservable();

  // private _recentMessages = new BehaviorSubject<Message[]>([]);
  // public recentMessages = this._recentMessages.asObservable();

  connect(token: string) {
    this.socket = io (`${this.ws}`, {
      extraHeaders:{
        Authorization: `Bearer ${token}`
      }
    })

    this.socket.on('connect', () => {
      this._isConnected.next(true);
    })

    this.socket.on('disconnect', () => {
      this._isConnected.next(false);
    })
  }

  disconnect() {
    if (this.socket && this.socket.connected) {
      this.socket.disconnect();
    }
  }
  

  sendMessage(message: string) {
    if (this.socket.connected) {
      this.socket.emit('message', message);
    } else {
      console.log('intento de enviar mensaje: sin conexion');
    }
  }

  onMessage():Observable<Message>{
    return new Observable<Message>((observer) => {
      if(this.socket){
        this.socket.on('message', (message: Message) => observer.next(message));
      }else{
        console.log('socket no connection')
      }
    })
  }

  onRecentMessages(): Observable<Message[]> {
    return new Observable<Message[]>((observer) => {
      this.socket.on('recent-messages', (messages: Message[]) => {
        observer.next(messages);
      });
    });
  }
}

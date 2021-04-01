import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs';
import {ChatClient} from './chat-client.model';
import {ChatMessage} from './chat-message.model';
import {WelcomeDto} from './welcome.dto';
import {map} from 'rxjs/operators';
import {SocketChat} from '../../app.module';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chatClient: ChatClient | undefined;

  constructor(private socket: SocketChat) { }

  sendMessage(msg: ChatMessage): void {
    this.socket.emit('message', msg);
  }

  listenForMessages(): Observable<ChatMessage>{
    return this.socket
      .fromEvent<ChatMessage>('newMessage');
  }

  listenForClients(): Observable<ChatClient[]>{
    return this.socket
      .fromEvent<ChatClient[]>('clients');
  }

  getAllMessages(): Observable<ChatMessage[]>{
    return this.socket
      .fromEvent<ChatMessage[]>('allMessages');
  }

  disconnect(): void{
    this.socket.disconnect();
  }

  connect(): void{
    this.socket.connect();
  }

  sendNickname(nickname: string): void {
    this.socket.emit('nickname', nickname);
  }

  listenForWelcome(): Observable<WelcomeDto>{
    return this.socket
      .fromEvent<WelcomeDto>('welcome');
  }

  listenForErrors(): Observable<string>{
    return this.socket
      .fromEvent<string>('error');
  }

  listenForConnect(): Observable<string>{
    return this.socket
      .fromEvent<string>('connect')
      .pipe(
        map(() => {
          return this.socket.ioSocket.id;
        })
      );
  }

  listenForDisconnect(): Observable<string>{
    return this.socket
      .fromEvent<string>('disconnect')
      .pipe(
        map(() => {
          return this.socket.ioSocket.id;
        })
      );
  }

  userTyping(userTyping: any): void {
    if (userTyping){
      this.socket.emit('typeStatus', true);
    }
  }

  sendTypeStatus(typeStatus: boolean): void {
    this.socket.emit('typeStatus', typeStatus);
  }

  listenForClientTyping(): Observable<ChatClient>{
    return this.socket
      .fromEvent<ChatClient>('clientTyping');
  }
}

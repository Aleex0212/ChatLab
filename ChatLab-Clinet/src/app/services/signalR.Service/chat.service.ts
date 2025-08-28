import { environment } from '../../../environments/environment.development';
import * as signalR from '@microsoft/signalR';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private hubConnection!: signalR.HubConnection;

  public async startConnection(): Promise<boolean> {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.signalRUrl, {
        accessTokenFactory: () => sessionStorage.getItem('token') || '',
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();

    try {
      await this.hubConnection.start();
      this.hubConnection.onclose((error) => {
        console.error('SignalR connection closed', error);
      });
      return true;
    } catch (err) {
      console.error('Connection error:', err);
      return false;
    }
  }

  public async joinRoom(room: string): Promise<void> {
    try {
      await this.hubConnection.invoke('JoinRoom', room);
    } catch (err) {
      console.error(`Error joining room: ${room}`, err);
    }
  }

  public sendMessage(message: string): void {
    this.hubConnection
      .invoke('SendMessage', message)
      .catch((err) => console.error('SendMessage error:', err));
  }

  onMessageReceived(): Observable<[string, string]> {
    return new Observable((observer) => {
      this.hubConnection.on('ReceiveMessage', (user, message) => {
        observer.next([user, message]);
      });
    });
  }
}

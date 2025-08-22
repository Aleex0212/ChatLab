import { environment } from '../../../environments/environment.development';
import * as signalR from '@microsoft/signalR';
import { Injectable } from '@angular/core';
import { ConsoleLogger } from '@microsoft/signalR/dist/esm/Utils';
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
      return true;
    } catch (err) {
      return false;
    }
  }

  public joinRoom(room: string) {
    return this.hubConnection.invoke('JoinRoom', room);
  }

  public sendMessage(message: string): void {
    this.hubConnection
      .invoke('SendMessage', message)
      .catch((err) => console.log(err));
  }
}

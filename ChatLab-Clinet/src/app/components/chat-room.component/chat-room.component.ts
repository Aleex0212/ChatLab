import { ChatBubbleComponent } from '../chat-bubble.component/chat-bubble.component';
import { ChatService } from '../../services/signalR.Service/chat.service';
import { DockComponent } from '../dock.component/dock.component';
import { Topnavbar } from '../topnavbar/topnavbar';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-room',
  imports: [ChatBubbleComponent, DockComponent, Topnavbar, FormsModule],
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent implements OnInit {
  private room: string = 'chatroom';
  messageText: string = '';
  messages: { user: string; message: string }[] = [];

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.connectChatServer();
    this.subscribeToMessages();
  }

  async connectChatServer(): Promise<void> {
    const connected = await this.chatService.startConnection();
    if (connected) {
      this.chatService.joinRoom(this.room);
    }
  }

  sendMessage(): void {
    if (this.messageText.trim()) {
      this.chatService.sendMessage(this.messageText);
      this.messageText = '';
    }
  }

  private subscribeToMessages() {
    this.chatService.onMessageReceived().subscribe(([user, message]) => {
      this.messages.push({ user, message });
      console.log(`received message: User: ${user}, Message: ${message}`);
    });
  }
}

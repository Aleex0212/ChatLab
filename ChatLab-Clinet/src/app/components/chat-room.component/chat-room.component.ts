import { ChatBubbleComponent } from '../chat-bubble.component/chat-bubble.component';
import { ChatService } from '../../services/signalR.Service/chat.service';
import { DockComponent } from '../dock.component/dock.component';
import { Topnavbar } from '../topnavbar/topnavbar';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-room.component',
  imports: [ChatBubbleComponent, DockComponent, Topnavbar, FormsModule],
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.scss',
})
export class ChatRoomComponent implements OnInit {
  messageText: string = '';
  private room: string = 'chatroom';

  constructor(private chatService: ChatService) {}

  async ngOnInit() {
    this.connectChatServer();
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
}

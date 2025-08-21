import { Component } from '@angular/core';
import { ChatBubbleComponent } from '../chat-bubble.component/chat-bubble.component';
import { DockComponent } from '../dock.component/dock.component';
import { Topnavbar } from '../topnavbar/topnavbar';

@Component({
  selector: 'app-chat-room.component',
  imports: [ChatBubbleComponent, DockComponent, Topnavbar],
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.scss',
})
export class ChatRoomComponent {
  onSubmitClick() {}
}

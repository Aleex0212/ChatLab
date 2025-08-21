import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dock',
  imports: [],
  templateUrl: './dock.component.html',
  styleUrl: './dock.component.scss',
})
export class DockComponent {
  constructor(private router: Router) {}
  onHomeClick(): void {
    this.router.navigate(['home']);
  }
  onMessagesClick(): void {
    this.router.navigate(['chat-room']);
  }
}

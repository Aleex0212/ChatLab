import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topnavbar',
  imports: [],
  templateUrl: './topnavbar.html',
  styleUrl: './topnavbar.scss',
})
export class Topnavbar {
  constructor(private router: Router) {}

  public onLogout(): void {
    sessionStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}

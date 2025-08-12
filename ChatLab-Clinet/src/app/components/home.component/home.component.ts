import { AuthService } from '../services/auth.Service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Topnavbar } from '../topnavbar/topnavbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home.component',
  imports: [Topnavbar],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authUserSession();
  }

  authUserSession(): void {
    let token = this.authService.GetToken();
    if (!token) this.router.navigate(['login']);
  }
}

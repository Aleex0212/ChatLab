import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { LoginModel } from './models/login.model';
import { RegisterModel } from './models/register.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login.component',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isLogin: boolean = true;

  loginModel: LoginModel = { email: '', password: '' };
  registerModel: RegisterModel = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  toggleForm(type: 'login' | 'register') {
    this.isLogin = type === 'login';
  }

  onLogin() {
    this.authService.login(this.loginModel).subscribe({
      next: (response) => {
        if (response.token !== null) this.router.navigate(['/home']);
      },
    });
  }

  onRegister() {
    console.log('Register form submitted:', this.registerModel);
  }
}
// this.authService.register(this.registerModel);

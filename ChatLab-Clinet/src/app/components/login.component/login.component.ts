import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login.component',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isLogin: boolean = true;

  loginData = {
    email: '',
    password: '',
  };

  registerData = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  toggleForm(type: 'login' | 'register') {
    this.isLogin = type === 'login';
  }

  onLogin() {
    console.log('Login form submitted:', this.loginData);
    // Call AuthService.login(this.loginData)
  }

  onRegister() {
    console.log('Register form submitted:', this.registerData);
    // Call AuthService.register(this.registerData)
  }
}

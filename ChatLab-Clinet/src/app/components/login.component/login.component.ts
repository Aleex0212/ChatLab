import { ThemeToggleComponent } from '../theme-toggle.component/theme-toggle.component';
import { RegisterModel } from '../../services/auth.Service/models/register.model';
import { LoginModel } from '../../services/auth.Service/models/login.model';
import { AuthService } from '../../services/auth.Service/auth.service';
import { AlertComponent } from '../alert.component/alert.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login.component',
  imports: [CommonModule, FormsModule, AlertComponent, ThemeToggleComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isLogin: boolean = true;
  showAlert = false;

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
        if (response.token !== null) {
          this.router.navigate(['/home']);
        } else {
          this.showAlert = true;
          setTimeout(() => (this.showAlert = false), 2000);
        }
      },
      error: () => {
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 2000);
      },
    });
  }

  onRegister() {
    console.log('Register form submitted:', this.registerModel);
    // this.authService.register(this.registerModel);
  }
}

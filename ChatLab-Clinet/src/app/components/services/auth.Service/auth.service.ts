import { Injectable } from '@angular/core';
import { LoginModel } from './models/login.model';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginResponseModel } from './models/login-response.model';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private readonly apiUrl: string = environment.apiUrl;

  login(loginModel: LoginModel): Observable<LoginResponseModel> {
    return this.http
      .post<LoginResponseModel>(this.apiUrl, loginModel)
      .pipe(
        tap((response: LoginResponseModel) =>
          sessionStorage.setItem('token', response.token)
        )
      );
  }

  GetToken(): string | null {
    return sessionStorage.getItem('token');
  }
}

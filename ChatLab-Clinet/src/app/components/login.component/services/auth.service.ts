import { Injectable } from '@angular/core';
import { LoginModel } from '../models/login.model';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginResponseModel } from '../models/login-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private readonly apiUrl: string = 'http://localhost:5093/api/account/login';

  login(loginModel: LoginModel): Observable<LoginResponseModel> {
    return this.http
      .post<LoginResponseModel>(this.apiUrl, loginModel)
      .pipe(
        tap((response: LoginResponseModel) =>
          sessionStorage.setItem('token', response.token)
        )
      );
  }
}

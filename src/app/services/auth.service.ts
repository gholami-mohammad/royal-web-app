import { Injectable } from '@angular/core';
import { LoginRequest, LoginResponse } from '../models/auth';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(loginReq: LoginRequest): Observable<LoginResponse> {
    const target = `${environment.baseURL}/auth/login`;
    return this.http.post<LoginResponse>(target, loginReq).pipe(
      tap((res) => {
        // store access token
        localStorage.setItem('accessToken', res.accessToken);
        // store refresh token
        localStorage.setItem('refreshToken', res.refreshToken);
        // store user information
        const user: User = {
          id: res.id,
          username: res.username,
          email: res.email,
          firstName: res.firstName,
          lastName: res.lastName,
          gender: res.gender,
          image: res.image,
        };
        localStorage.setItem('user', JSON.stringify(user));
      })
    );
  }
}

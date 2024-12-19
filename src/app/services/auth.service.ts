import { Injectable } from '@angular/core';
import { LoginRequest, LoginResponse } from '../models/auth';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  static _user?: User;
  static userSubject: Subject<User | undefined> = new Subject();

  static getUser(): User | undefined {
    if (AuthService._user) {
      return AuthService._user;
    }
    try {
      const userStr = localStorage.getItem('user');
      const user = JSON.parse(userStr ?? '') as User;
      AuthService._user = user;

      return AuthService._user;
    } catch (e) {
      return undefined;
    }
  }

  constructor(private http: HttpClient, private router: Router) {}

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
        AuthService._user = user;

        AuthService.userSubject.next(user);
      })
    );
  }

  whoami(): Observable<User> {
    const target = `${environment.baseURL}/auth/me`;
    const token = localStorage.getItem('accessToken');

    if (!token || token == '') {
      return new Observable((obs) => {
        obs.error('unauthenticated user');
        obs.complete();
      });
    }

    return this.http.get<User>(target, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    AuthService.userSubject.next(undefined);

    this.router.navigate(['/login']);
  }
}

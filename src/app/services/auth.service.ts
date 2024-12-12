import { Injectable } from '@angular/core';
import { LoginRequest, LoginResponse } from '../models/auth';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(loginReq: LoginRequest): Observable<LoginResponse> {
    const target = `${environment.baseURL}/auth/login`;
    return this.http.post<LoginResponse>(target, loginReq);
  }
}

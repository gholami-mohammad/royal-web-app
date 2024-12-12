import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NotifService } from '../../services/notif.service';
import { LoginRequest } from '../../models/auth';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginFormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required),
  });

  constructor(private notif: NotifService, private authService: AuthService) {}

  login() {
    if (this.loginFormGroup.invalid) {
      this.notif.error(
        'Invalid login form',
        'Please provide your user credentials'
      );
      return;
    }

    const loginReq: LoginRequest = {
      username: this.loginFormGroup.controls.username.value ?? '',
      password: this.loginFormGroup.controls.password.value ?? '',
      expiresInMins: 60,
    };

    this.authService.login(loginReq).subscribe({
      next: (res) => {
        // TODO: use tap pipe to store user data in auth service
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
      },
      error: (err) => {
        this.notif.error('failed to login!', 'please try again later');
        console.error('failed to do login:', err);
      },
    });
  }
}

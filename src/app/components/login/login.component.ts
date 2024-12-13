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
        // TODO: add a loading
      },
      error: (err) => {
        this.notif.error('failed to login!', 'please try again later');
        console.error('failed to do login:', err);
      },
    });
  }
}

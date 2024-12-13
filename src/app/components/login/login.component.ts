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
import { LoadingComponent } from '../loading/loading.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf, LoadingComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loading = false;

  loginFormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private notif: NotifService,
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    if (this.loginFormGroup.invalid) {
      this.notif.error(
        'Invalid login form',
        'Please provide your user credentials'
      );
      return;
    }

    this.loading = true;

    const loginReq: LoginRequest = {
      username: this.loginFormGroup.controls.username.value ?? '',
      password: this.loginFormGroup.controls.password.value ?? '',
      expiresInMins: 60,
    };

    this.authService.login(loginReq).subscribe({
      next: (res) => {
        this.router.navigate(['/dashboard']);
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.notif.error('failed to login!', 'please try again later');
        console.error('failed to do login:', err);
      },
    });
  }
}

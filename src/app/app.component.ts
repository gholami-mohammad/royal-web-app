import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { User } from './models/user';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  authUser?: User;
  isLogin = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authUser = AuthService.getUser();
    if (this.authUser == undefined || this.authUser == null) {
      this.isLogin = false;
    } else {
      this.isLogin = true;
    }

    AuthService.userSubject.subscribe({
      next: (data) => {
        this.authUser = data;

        if (this.authUser == undefined || this.authUser == null) {
          this.isLogin = false;
        } else {
          this.isLogin = true;
        }
      },
    });
  }

  logout() {
    this.authService.logout();
  }
}

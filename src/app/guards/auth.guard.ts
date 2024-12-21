import { inject } from '@angular/core';
import {
  CanActivateFn,
  GuardResult,
  MaybeAsync,
  Router,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { firstValueFrom, Observable } from 'rxjs';
import { User } from '../models/user';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  try {
    const result = await firstValueFrom(authService.whoami());

    return true;
  } catch (e) {
    console.error('can activate failed: ', e);

    authService.logout();
    return false;
  }
};

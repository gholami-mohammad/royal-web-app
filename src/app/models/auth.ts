import { User } from './user';

export class LoginRequest {
  username!: string;
  password!: string;
  expiresInMins?: number = 60;
}

export class LoginResponse extends User {
  accessToken!: string;
  refreshToken!: string;
}

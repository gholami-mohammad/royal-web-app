export class LoginRequest {
  username!: string;
  password!: string;
  expiresInMins?: number = 60;
}

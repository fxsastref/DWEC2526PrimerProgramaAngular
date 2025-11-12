export interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'user' | 'manager';
  fullName: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface JwtPayload {
  sub: string;
  username: string;
  role: string;
  exp: number;
}

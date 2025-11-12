import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User, LoginRequest, JwtPayload } from '../models/user.model';
import { MockBackendService } from './mock-backend.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private tokenKey = 'jwt_token';

  constructor(private mockBackend: MockBackendService) {
    const storedUser = this.getUserFromToken();
    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<any> {
    return this.mockBackend.login({ username, password })
      .pipe(
        tap(response => {
          // Store JWT token
          localStorage.setItem(this.tokenKey, response.token);
          this.currentUserSubject.next(response.user);
        })
      );
  }

  logout(): void {
    // Remove token from local storage
    localStorage.removeItem(this.tokenKey);
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    
    // Check if token is expired
    try {
      const payload = this.decodeToken(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp > currentTime;
    } catch {
      return false;
    }
  }

  hasRole(role: string): boolean {
    const user = this.currentUserValue;
    return user?.role === role;
  }

  hasAnyRole(roles: string[]): boolean {
    const user = this.currentUserValue;
    return user ? roles.includes(user.role) : false;
  }

  private decodeToken(token: string): JwtPayload {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid token format');
    }
    
    const payload = JSON.parse(atob(parts[1]));
    return payload as JwtPayload;
  }

  private getUserFromToken(): User | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    try {
      const payload = this.decodeToken(token);
      const currentTime = Math.floor(Date.now() / 1000);
      
      if (payload.exp < currentTime) {
        // Token expired
        localStorage.removeItem(this.tokenKey);
        return null;
      }

      // Reconstruct user from token payload
      return {
        id: parseInt(payload.sub),
        username: payload.username,
        email: `${payload.username}@example.com`, // Not stored in token
        role: payload.role as 'admin' | 'user' | 'manager',
        fullName: payload.username // Not stored in token
      };
    } catch {
      localStorage.removeItem(this.tokenKey);
      return null;
    }
  }
}

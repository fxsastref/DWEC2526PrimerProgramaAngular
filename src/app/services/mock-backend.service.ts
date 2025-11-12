import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User, LoginRequest, LoginResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class MockBackendService {
  private users: User[] = [
    { id: 1, username: 'admin', email: 'admin@example.com', role: 'admin', fullName: 'Administrator' },
    { id: 2, username: 'user', email: 'user@example.com', role: 'user', fullName: 'Regular User' },
    { id: 3, username: 'manager', email: 'manager@example.com', role: 'manager', fullName: 'Manager User' }
  ];

  // Simulate password validation (in production, this would be on backend)
  private credentials: { [username: string]: string } = {
    'admin': 'admin123',
    'user': 'user123',
    'manager': 'manager123'
  };

  constructor() { }

  login(request: LoginRequest): Observable<LoginResponse> {
    // Simulate API delay
    return new Observable<LoginResponse>(observer => {
      setTimeout(() => {
        const user = this.users.find(u => u.username === request.username);
        
        if (!user || this.credentials[request.username] !== request.password) {
          observer.error({ error: 'Invalid username or password' });
          return;
        }

        // Generate mock JWT token
        const token = this.generateMockToken(user);
        
        observer.next({ token, user });
        observer.complete();
      }, 500);
    });
  }

  private generateMockToken(user: User): string {
    // Create a mock JWT token (base64 encoded)
    const header = { alg: 'HS256', typ: 'JWT' };
    const payload = {
      sub: user.id.toString(),
      username: user.username,
      role: user.role,
      exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour expiration
    };
    
    const base64Header = btoa(JSON.stringify(header));
    const base64Payload = btoa(JSON.stringify(payload));
    const signature = btoa(`mock-signature-${user.username}`);
    
    return `${base64Header}.${base64Payload}.${signature}`;
  }

  getAllUsers(): Observable<User[]> {
    return of(this.users).pipe(delay(300));
  }

  getUserById(id: number): Observable<User | undefined> {
    return of(this.users.find(u => u.id === id)).pipe(delay(200));
  }

  createUser(user: Omit<User, 'id'>): Observable<User> {
    const newUser: User = {
      ...user,
      id: Math.max(...this.users.map(u => u.id)) + 1
    };
    this.users.push(newUser);
    return of(newUser).pipe(delay(300));
  }

  updateUser(id: number, user: Partial<User>): Observable<User> {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) {
      return throwError(() => new Error('User not found'));
    }
    this.users[index] = { ...this.users[index], ...user };
    return of(this.users[index]).pipe(delay(300));
  }

  deleteUser(id: number): Observable<boolean> {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) {
      return throwError(() => new Error('User not found'));
    }
    this.users.splice(index, 1);
    return of(true).pipe(delay(300));
  }
}

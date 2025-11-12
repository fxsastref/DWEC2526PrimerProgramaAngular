import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { MockBackendService } from './mock-backend.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private mockBackend: MockBackendService) { }

  getAllUsers(): Observable<User[]> {
    return this.mockBackend.getAllUsers();
  }

  getUserById(id: number): Observable<User | undefined> {
    return this.mockBackend.getUserById(id);
  }

  createUser(user: Omit<User, 'id'>): Observable<User> {
    return this.mockBackend.createUser(user);
  }

  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.mockBackend.updateUser(id, user);
  }

  deleteUser(id: number): Observable<boolean> {
    return this.mockBackend.deleteUser(id);
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  loading = false;
  errorMessage = '';
  showAddForm = false;
  editingUser: User | null = null;

  newUser = {
    username: '',
    email: '',
    fullName: '',
    role: 'user' as 'admin' | 'user' | 'manager'
  };

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.errorMessage = '';
    
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load users';
        this.loading = false;
      }
    });
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    if (this.showAddForm) {
      this.resetNewUser();
      this.editingUser = null;
    }
  }

  resetNewUser(): void {
    this.newUser = {
      username: '',
      email: '',
      fullName: '',
      role: 'user'
    };
  }

  addUser(): void {
    if (!this.newUser.username || !this.newUser.email || !this.newUser.fullName) {
      this.errorMessage = 'All fields are required';
      return;
    }

    this.loading = true;
    this.userService.createUser(this.newUser).subscribe({
      next: (user) => {
        this.users.push(user);
        this.showAddForm = false;
        this.resetNewUser();
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to create user';
        this.loading = false;
      }
    });
  }

  editUser(user: User): void {
    this.editingUser = { ...user };
    this.showAddForm = false;
  }

  updateUser(): void {
    if (!this.editingUser) return;

    this.loading = true;
    this.userService.updateUser(this.editingUser.id, this.editingUser).subscribe({
      next: (updatedUser) => {
        const index = this.users.findIndex(u => u.id === updatedUser.id);
        if (index !== -1) {
          this.users[index] = updatedUser;
        }
        this.editingUser = null;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to update user';
        this.loading = false;
      }
    });
  }

  cancelEdit(): void {
    this.editingUser = null;
  }

  deleteUser(id: number): void {
    if (!confirm('Are you sure you want to delete this user?')) {
      return;
    }

    this.loading = true;
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.users = this.users.filter(u => u.id !== id);
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to delete user';
        this.loading = false;
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}

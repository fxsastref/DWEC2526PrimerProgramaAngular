# Authentication & Authorization Documentation

## Overview

This document describes the authentication and authorization system implemented in the Angular application using JWT (JSON Web Tokens).

## Architecture

### Components

#### 1. **AuthService** (`src/app/services/auth.service.ts`)
The main authentication service that manages user authentication state.

**Key Methods:**
- `login(username, password)`: Authenticates user and stores JWT token
- `logout()`: Clears authentication state and removes token
- `getToken()`: Retrieves stored JWT token
- `isAuthenticated()`: Checks if user is authenticated and token is valid
- `hasRole(role)`: Checks if user has a specific role
- `hasAnyRole(roles)`: Checks if user has any of the specified roles

#### 2. **UserService** (`src/app/services/user.service.ts`)
Manages user CRUD operations.

**Key Methods:**
- `getAllUsers()`: Fetches all users
- `getUserById(id)`: Fetches a specific user
- `createUser(user)`: Creates a new user
- `updateUser(id, user)`: Updates an existing user
- `deleteUser(id)`: Deletes a user

#### 3. **MockBackendService** (`src/app/services/mock-backend.service.ts`)
Simulates a REST API for authentication and user management.

**Features:**
- Generates mock JWT tokens
- Validates credentials
- Manages in-memory user data
- Simulates API latency

### Guards

#### 1. **authGuard** (`src/app/guards/auth.guard.ts`)
Protects routes that require authentication.

**Behavior:**
- Checks if user is authenticated
- Redirects to login page if not authenticated
- Preserves the return URL for post-login redirect

#### 2. **roleGuard** (`src/app/guards/auth.guard.ts`)
Protects routes that require specific roles.

**Behavior:**
- Checks if user is authenticated
- Verifies user has required role(s)
- Redirects to dashboard if unauthorized

### Interceptors

#### **jwtInterceptor** (`src/app/interceptors/jwt.interceptor.ts`)
Automatically attaches JWT tokens to HTTP requests.

**Behavior:**
- Intercepts all outgoing HTTP requests
- Adds `Authorization: Bearer <token>` header
- Only adds header if token exists and is valid

## JWT Token Structure

The JWT token contains the following payload:

```json
{
  "sub": "user_id",
  "username": "username",
  "role": "admin|manager|user",
  "exp": 1234567890
}
```

**Token Storage:**
- Tokens are stored in `localStorage` with key `jwt_token`
- Tokens expire after 1 hour
- Expired tokens are automatically removed

## User Roles

### Admin
- Full system access
- Can access user management
- Can perform all CRUD operations on users

### Manager
- Can access user management
- Can perform all CRUD operations on users
- Limited to management tasks

### User
- Basic access only
- Can view their own profile
- Cannot access user management

## Routes

### Public Routes
- `/login` - Login page (accessible to all)

### Protected Routes
- `/dashboard` - Dashboard (requires authentication)
- `/users` - User management (requires admin or manager role)

## Security Features

### 1. Token Validation
- Tokens are validated on every authentication check
- Expired tokens are automatically cleared
- Token signature is included (mock implementation)

### 2. Route Protection
- All protected routes require authentication
- Role-specific routes enforce role requirements
- Unauthorized access attempts redirect appropriately

### 3. Secure Storage
- JWT tokens stored in localStorage
- Token cleared on logout
- No sensitive data in token payload

## Usage Examples

### Login
```typescript
this.authService.login('admin', 'admin123').subscribe({
  next: () => {
    // Login successful, navigate to dashboard
    this.router.navigate(['/dashboard']);
  },
  error: (error) => {
    // Handle login error
    console.error('Login failed:', error);
  }
});
```

### Check Authentication
```typescript
if (this.authService.isAuthenticated()) {
  // User is authenticated
}
```

### Check Role
```typescript
if (this.authService.hasRole('admin')) {
  // User is admin
}

if (this.authService.hasAnyRole(['admin', 'manager'])) {
  // User is admin or manager
}
```

### Logout
```typescript
this.authService.logout();
this.router.navigate(['/login']);
```

## Test Accounts

The following test accounts are available:

| Username | Password    | Role    | Access Level              |
|----------|-------------|---------|---------------------------|
| admin    | admin123    | admin   | Full access               |
| manager  | manager123  | manager | User management access    |
| user     | user123     | user    | Basic access              |

## Future Enhancements

### Recommended Improvements:
1. **Real Backend Integration**: Replace MockBackendService with actual HTTP calls
2. **Token Refresh**: Implement refresh token mechanism
3. **Password Reset**: Add forgot password functionality
4. **2FA**: Implement two-factor authentication
5. **Session Management**: Add concurrent session management
6. **Audit Logging**: Log authentication and authorization events
7. **Rate Limiting**: Add rate limiting for login attempts
8. **HTTPS Only**: Enforce HTTPS in production
9. **CSRF Protection**: Add CSRF token validation
10. **Content Security Policy**: Implement CSP headers

## Best Practices

### Development
- Never commit real credentials
- Use environment-specific configuration
- Implement proper error handling
- Log authentication events

### Production
- Use real JWT signing with strong secret keys
- Implement token refresh mechanism
- Use HTTPS only
- Set proper CORS policies
- Implement rate limiting
- Monitor authentication failures
- Regular security audits

## Troubleshooting

### Token Expired
**Symptom**: User is logged out unexpectedly
**Solution**: Token has expired. User needs to log in again.

### Cannot Access Protected Route
**Symptom**: User redirected to login or dashboard
**Solution**: Check authentication status and user role.

### Token Not Attached to Requests
**Symptom**: HTTP requests fail authentication
**Solution**: Ensure jwtInterceptor is registered in app.config.ts

## API Reference

### AuthService

#### Methods

##### login(username: string, password: string): Observable<any>
Authenticates user with username and password.

**Parameters:**
- `username`: User's username
- `password`: User's password

**Returns:**
- Observable that emits login response with token and user data

**Example:**
```typescript
authService.login('admin', 'admin123').subscribe(...);
```

##### logout(): void
Logs out current user and clears authentication state.

**Example:**
```typescript
authService.logout();
```

##### isAuthenticated(): boolean
Checks if user is currently authenticated.

**Returns:**
- `true` if user is authenticated and token is valid, `false` otherwise

**Example:**
```typescript
if (authService.isAuthenticated()) {
  // User is authenticated
}
```

##### hasRole(role: string): boolean
Checks if current user has specified role.

**Parameters:**
- `role`: Role to check

**Returns:**
- `true` if user has the role, `false` otherwise

**Example:**
```typescript
if (authService.hasRole('admin')) {
  // User is admin
}
```

##### hasAnyRole(roles: string[]): boolean
Checks if current user has any of the specified roles.

**Parameters:**
- `roles`: Array of roles to check

**Returns:**
- `true` if user has any of the roles, `false` otherwise

**Example:**
```typescript
if (authService.hasAnyRole(['admin', 'manager'])) {
  // User is admin or manager
}
```

### UserService

#### Methods

##### getAllUsers(): Observable<User[]>
Fetches all users in the system.

**Returns:**
- Observable that emits array of users

**Example:**
```typescript
userService.getAllUsers().subscribe(users => {
  console.log(users);
});
```

##### getUserById(id: number): Observable<User | undefined>
Fetches a specific user by ID.

**Parameters:**
- `id`: User ID

**Returns:**
- Observable that emits user or undefined if not found

**Example:**
```typescript
userService.getUserById(1).subscribe(user => {
  console.log(user);
});
```

##### createUser(user: Omit<User, 'id'>): Observable<User>
Creates a new user.

**Parameters:**
- `user`: User object without ID

**Returns:**
- Observable that emits created user with ID

**Example:**
```typescript
userService.createUser({
  username: 'newuser',
  email: 'newuser@example.com',
  fullName: 'New User',
  role: 'user'
}).subscribe(user => {
  console.log('Created user:', user);
});
```

##### updateUser(id: number, user: Partial<User>): Observable<User>
Updates an existing user.

**Parameters:**
- `id`: User ID
- `user`: Partial user object with fields to update

**Returns:**
- Observable that emits updated user

**Example:**
```typescript
userService.updateUser(1, { fullName: 'Updated Name' }).subscribe(user => {
  console.log('Updated user:', user);
});
```

##### deleteUser(id: number): Observable<boolean>
Deletes a user.

**Parameters:**
- `id`: User ID

**Returns:**
- Observable that emits true on success

**Example:**
```typescript
userService.deleteUser(1).subscribe(() => {
  console.log('User deleted');
});
```

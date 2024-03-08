// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '../Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://localhost:7066/api/Auth'; // Your backend URL
  private tokenKey = 'jwt_token'; // Key to store JWT token in localStorage

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/user`); // Adjust the endpoint as per your API
  }

  signUp(fullName: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, { fullName, email, password });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password });
  }
  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${userId}`);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/edit/${user.id}`, user);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (token) {
      const tokenExpiration = this.getTokenExpiration(token);
      const currentTime = Date.now() / 1000;
      return !!tokenExpiration && tokenExpiration > currentTime; // Ensure tokenExpiration is truthy before comparison
    }
    return false;
  }

  private getTokenExpiration(token: string): number | null {
    try {
      const decodedToken = this.decodeToken(token);
      return decodedToken?.exp ?? null; // Use optional chaining and nullish coalescing operator to handle potential null value
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  private decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(base64));
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
}
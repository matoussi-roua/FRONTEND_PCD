import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterDto } from '../../models/auth/register-dto';
import { Observable } from 'rxjs';
import { LoginDto } from '../../models/auth/login-dto';
import { AuthResponseDto } from '../../models/auth/auth-response-dto';
import { Token } from '../../models/token/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private baseUrl = 'http://localhost:8080/api/v1/auth';
  private tokenKey = 'token'; 
  private iduser='idUser';
  private roleuser='roleUser';

  constructor(private http: HttpClient) { }

  register(registerDto: RegisterDto): Observable<AuthResponseDto> {
    return this.http.post<AuthResponseDto>(`${this.baseUrl}/register`, registerDto);
  }

  login(loginDto: LoginDto): Observable<AuthResponseDto> {
    return this.http.post<AuthResponseDto>(`${this.baseUrl}/login`, loginDto);
  }

  logout(): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/logout1`);
  }
  getToken(): string | null {
    const tokenString = localStorage.getItem(this.tokenKey);
    //console.log(tokenString);
    if (tokenString) {
      //const token: Token = JSON.parse(tokenString);
      //console.log(tokenString);
      return tokenString;
    }
    return null;
    
  }
//setToken(token: string) {
   // localStorage.setItem('token', token);
  //}
   setToken(token: string): void {
     localStorage.setItem(this.tokenKey, token);
   };

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
//stock the id user in the local storage
  setRoleUser(name: string) {
    localStorage.setItem(this.roleuser, name);

  }
  //stock the role user in local storage
  setIdUser(id: string) {
    localStorage.setItem(this.iduser, id);

  }
  getRoleUser() :string | null {
    const roleString = localStorage.getItem(this.roleuser);
    if (roleString) {
      return roleString;
    }
    return null;
  }
  removeRole(): void {
    localStorage.removeItem(this.roleuser);
  }
  //stock the role user in local storage
  getIdUser() :string | null {
    const idString = localStorage.getItem(this.iduser);
    if (idString) {
      return idString;
    }
    return null;
  }
  removeIdUser(): void {
    localStorage.removeItem(this.iduser);
  }
  clearLocalStorage() {
    this.removeIdUser();
    this.removeRole();
    this.removeToken();

  }
  
  // private tokenKey = 'auth_token'; // Key for storing token in local storage

  // constructor() { }

  // // Save token to local storage
  // setToken(token: string): void {
  //   localStorage.setItem(this.tokenKey, token);
  // }

  // // Retrieve token from local storage
  // getToken(): string | null {
  //   return localStorage.getItem(this.tokenKey);
  // }

  // // Remove token from local storage
  // removeToken(): void {
  //   localStorage.removeItem(this.tokenKey);
  // }

  // // Check if user is logged in (token exists)
  // isLoggedIn(): boolean {
  //   return !!this.getToken();
  // }
}
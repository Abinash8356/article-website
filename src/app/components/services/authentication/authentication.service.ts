import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/constants/constant';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl = environment.backendUrl;

  constructor(private http: HttpClient) { }

  loginUser(payload) : Observable<any> {
    const result = this.http.post(`${this.baseUrl}/auth/login/user`, payload);
    return result;
  }

  registerUser(payload: User) : Observable<any> {
    const result = this.http.post(`${this.baseUrl}/auth/create/user`, payload);
    return result;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}

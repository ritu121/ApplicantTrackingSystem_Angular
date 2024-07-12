import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable, catchError, map, throwError } from 'rxjs';
import { RegisterModel } from '../../models/register.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.rootApiUrl + environment.UserApi;
  }
  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.message || 'Server error');
    return throwError(res.error || 'Server error');
  }



  // login(username: string, password: string): Observable<LoginResponse>{
  //   return this.http.get(`${this.apiUrl}/UserLogin?username=${username}&password=${password}`);
  
  // }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.get<LoginResponse>(`${this.apiUrl}/UserLogin?username=${username}&password=${password}`);
  }

}

interface LoginResponse {
  userID: string;
  userName: string;
}
  
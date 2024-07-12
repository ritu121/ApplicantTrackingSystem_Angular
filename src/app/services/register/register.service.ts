import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable, catchError, map, throwError } from 'rxjs';
import { RegisterModel ,DeleteModel} from '../../models/register.model';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {
      
  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.rootApiUrl + environment.UserApi;
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.message || 'Server error');
    return throwError(res.error || 'Server error');
  }

  Add_Update_delete_User(enp: RegisterModel) {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    };
    return this.http
      .post<RegisterModel>(this.apiUrl + '/CreateOrUpdateUsersOrDelete', enp, httpOptions)
      .pipe(catchError(this.handleError.bind(this)));
  }

  delete_User(enp: DeleteModel) {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    };
    return this.http
      .post<DeleteModel>(this.apiUrl + '/CreateOrUpdateUsersOrDelete', enp, httpOptions)
      .pipe(catchError(this.handleError.bind(this)));
  }


 

  Edit_register(labelId: string): Observable<RegisterModel> {
    return this.http.get<RegisterModel>(`${this.apiUrl}/AllUsers?UserId=${labelId}`);
    
  }
  

  GetallRegisterDetails() {
  
    return this.http
      .get<any>(this.apiUrl + '/AllUsers')
      .pipe(
        map(data => data),
        catchError(this.handleError.bind(this))
      );
  }




}

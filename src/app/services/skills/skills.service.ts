import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { catchError, map, throwError } from 'rxjs';
import { Skills } from '../../models/skills.model';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.rootApiUrl + environment.skillApi;
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.message || 'Server error');
    return throwError(res.error || 'Server error');
  }

  Add_Skills(enp: Skills) {
  
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    };
 
    return this.http
      .post<Skills>(this.apiUrl + '/CreateOrUpdateSkillDetails', enp, httpOptions)
      .pipe(catchError(this.handleError.bind(this)));
  }




  GetallskillDetails() {

    return this.http
      .get<any>(this.apiUrl + '/AllSkills')
      .pipe(
        map(data => data),
        catchError(this.handleError.bind(this))
      );
  }





}

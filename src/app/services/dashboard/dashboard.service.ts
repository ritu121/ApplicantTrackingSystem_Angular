import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError as observableThrowError } from 'rxjs';

import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})


export class DashboardService {


  apiUrl;
  constructor(private http: HttpClient) {

    this.apiUrl = environment.rootApiUrl + environment.dashboardApi;

  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }


  GetallDashboardcount() {
    return this.http
      .get<any>(this.apiUrl + '/DashboardInformation')
      .pipe(map(data => data), catchError(this.handleError));
  }

  GetAllDetails(FromDate: any, toDate: any): Observable<any> {
    // debugger
    if (FromDate && toDate) {
      return this.http.get<any>(`${this.apiUrl}/GetCandidateDashboardByActiveTile?FromDate=${FromDate}&EndDate=${toDate}`).pipe(
        map(data => data.item2),
        catchError(this.handleError)
      );
    } else {
      return this.http.get<any>(`${this.apiUrl}/GetCandidateDashboardByActiveTile`).pipe(
        map(data => data.item2),
        catchError(this.handleError)
      );
    }
  }
  GetAllCandidateDetails(FromDate: any, toDate: any): Observable<any> {
    // debugger
    if (FromDate && toDate) {
      return this.http.get<any>(`${this.apiUrl}/CandidateDashboard?FromDate=${FromDate}&EndDate=${toDate}`).pipe(
        map(data => data.item2),
        catchError(this.handleError)
      );
    } else {
      return this.http.get<any>(`${this.apiUrl}/CandidateDashboard`).pipe(
        map(data => data.item2),
        catchError(this.handleError)
      );
    }

  }

  DeleteCandidate(dataItem: any) {

    return this.http
      .delete<any>(`${this.apiUrl}/DeleteCandidate/` + dataItem)
      .pipe(map(data => data), catchError(this.handleError));
  }

}

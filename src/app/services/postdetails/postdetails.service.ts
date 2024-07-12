import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Postdetails } from '../../models/postdetails.models';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostdetailsService {

 
  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.rootApiUrl + environment.skillApi;
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.message || 'Server error');
    return throwError(res.error || 'Server error');
  }

  Add_Postdetails(enp: Postdetails) {
    // debugger;
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    };
    return this.http
      .post<Postdetails>(this.apiUrl + '/CreateOrUpdatePostDetails', enp, httpOptions)
      .pipe(catchError(this.handleError.bind(this)));
  }

  // Add_Postdetails(dat: any) {
  //   debugger;
  //   return this.http
  //     .post<Postdetails>(this.apiUrl + '/CreateOrUpdatePostDetails', dat)      
  //     .pipe(catchError(this.handleError));
  // }
  
  // Update_Postdetails(enp: Postdetails) {

  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     })
  //   };
  //   return this.http
  //     .put<Postdetails>(this.apiUrl + '/CreateOrUpdatePostDetails', enp, httpOptions)
  //     .pipe(catchError(this.handleError.bind(this)));
  // }
  // Update_Postdetails(dat:any) {
  //   //  debugger
  //       return this.http
  //         .post<Postdetails>(this.apiUrl + '/CreateOrUpdatePostDetails',dat)
  //         .pipe(catchError(this.handleError));
  //     }
  

  GetallActivePost() {
    return this.http
      .get<any>(this.apiUrl + '/AllPostsAppliedFor')
      .pipe(
        map(data => data),
        catchError(this.handleError.bind(this))
      );
  }

  GetallPostDetails() {

    return this.http
      .get<any>(this.apiUrl + '/ActivePostApplications')
      .pipe(
        map(data => data),
        catchError(this.handleError.bind(this))
      );
  }
}


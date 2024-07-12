import { Injectable } from '@angular/core';
import { JobsModel,JobsModel2 } from '../../models/jobs.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { environment } from '../../environment/environment';


@Injectable({
  providedIn: 'root'
})
export class JobsService {

  apiUrl;
  constructor(private http: HttpClient) {
    this.apiUrl = environment.rootApiUrl + environment.vendorApi;
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }
  Add_Jobs(jobsData: JobsModel) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    };
    return this.http
      .post<JobsModel>(this.apiUrl + '/ManageJobDetails', jobsData, httpOptions)
      .pipe(catchError(this.handleError));
  }

  GetallJobs(id:any) {
    if(!id){
      return this.http
      .get<any>(this.apiUrl + '/GetJobDetails')
      .pipe(
        map(data => data),
        catchError(this.handleError.bind(this))
      );
    }else{
      return this.http
      .get<any>(this.apiUrl + `/GetJobDetails?JobId=${id}`)
      .pipe(
        map(data => data),
        catchError(this.handleError.bind(this))
      );
    }
    
  }

  Delete_Jobs(jobsData: JobsModel2) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    };
    return this.http
      .post<JobsModel>(this.apiUrl + '/ManageJobDetails', jobsData, httpOptions)
      .pipe(catchError(this.handleError));
  }
  


}

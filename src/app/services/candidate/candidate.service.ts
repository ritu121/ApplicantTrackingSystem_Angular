import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
//import { Observable, throwError as observableThrowError } from 'rxjs';
import { CandidateModel } from '../../models/candidate.model';
import { environment } from '../../environment/environment';
import { Observable, throwError as observableThrowError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  apiUrl;
  apiUrl1;
  constructor(private http: HttpClient) {
    this.apiUrl = environment.rootApiUrl + environment.candidateApi;
    this.apiUrl1 = environment.rootApiUrl + environment.skillApi;
   }

   private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }

//   Add_Candit(dat:any) {
// //  debugger
//     return this.http
//       .post<CandidateModel>(this.apiUrl + '/CreateOrUpdate',dat)
//       .pipe(catchError(this.handleError));
//       console.log(console.error())
//   }

  addCandidate(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl+'/CreateOrUpdate', formData);
  }

  Edit_candit(labelId: string): Observable<CandidateModel> {
    //  debugger
    return this.http.get<CandidateModel>(`${this.apiUrl}/CandidateDetails?CandidateId=${labelId}`);
  }

    
  GetallActiveskill() {
    return this.http
      .get<any>(this.apiUrl1 + '/ActiveSkills')
      .pipe(
        map(data => data),
        catchError(this.handleError.bind(this))
      );
  }
  
  // AllSkills(){
  //   return this.http
  //   .get<any>(this.apiUrl1+ '/AllSkills')
  //   .pipe(map(data => data), catchError(this.handleError));
  // }


}




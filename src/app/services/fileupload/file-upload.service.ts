import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError as observableThrowError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  apiUrl;
  constructor(private http: HttpClient) {
    this.apiUrl = environment.rootApiUrl + environment.candidateApi;
  }
  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }
  uploadFiles(formData: FormData) {
    return this.http.post(`${this.apiUrl}/UploadDocuments`, formData, {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data'
      })
    });
  }
  getFiles(CandidateId: any) {
    return this.http
      .get<any>(this.apiUrl + `/GetDocuments?CandidateID=${CandidateId}`)
      .pipe(map(data => data), catchError(this.handleError));
  }
  DownloadResponse(fileName: any, candidateID: any) {
    return this.http
      .get<any>(this.apiUrl + `/DownloadReleaseNotesFile?candidateId=${candidateID}&fileName=${fileName}`)
      .pipe(map(data => data), catchError(this.handleError));
  }

  downloadFile(fileName: string, candidateId: string): Observable<Blob> {
    const url = `${this.apiUrl}/DownloadReleaseNotesFile`;
    const options = {
      responseType: 'blob' as 'json', // Response type as blob
      params: {
        candidateId,
        fileName
      }
    };
    return this.http.get<Blob>(url, options);
  }

  DeleteDocuments(candidateId:any,documentId:any,fileName:any) {
    return this.http
      .delete<any>(`${this.apiUrl}/DeleteDocuments/${candidateId}/${documentId}/${fileName}`)
      .pipe(map(data => data), catchError(this.handleError));
  }
}

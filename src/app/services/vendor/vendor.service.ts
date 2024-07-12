import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { Vendor } from '../../models/vendor.model';
import { environment } from '../../environment/environment';




@Injectable({
  providedIn: 'root'
})
export class VendorService {
  apiUrl;
  constructor(private http: HttpClient) {
    this.apiUrl = environment.rootApiUrl + environment.vendorApi;
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }

  Add_Vendor(enp: Vendor) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    };


    return this.http
      .post<Vendor>(this.apiUrl + '/CreateOrUpdateVendor', enp, httpOptions)
      .pipe(catchError(this.handleError));
  }

  GetallVendors() {
    return this.http
      .get<any>(this.apiUrl + '/AllVendors')
      .pipe(map(data => data), catchError(this.handleError));
  }
  GetVendorsDrop(){
    return this.http
      .get<any>(this.apiUrl + '/VendorDropDown')
      .pipe(map(data => data), catchError(this.handleError));
  }

  DeleteVendors(id: any) {
    return this.http
      .delete<any>(this.apiUrl + `/DeleteVendor?Id=${id}`)
      .pipe(map(data => data), catchError(this.handleError));
  }

  Edit_vendor(labelId: string): Observable<Vendor> {
    //  debugger
    return this.http.get<Vendor>(`${this.apiUrl}/allVendors?Id=${labelId}`);
  }
  
}

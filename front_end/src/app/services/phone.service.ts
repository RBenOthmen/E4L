
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, tap } from 'rxjs';
import { Phone } from '../interfaces/Phone';
import { handleError } from './../exceptions/handleError';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json',
  }),
}

@Injectable({
  providedIn: 'root'
})
export class PhoneService {

  private baseUrl = 'http://localhost:8000/'

  private urlPhone = this.baseUrl+'core/phones/';

  constructor(
    private http : HttpClient
  ) { }

  getPhone(id : string) : Observable<Phone>{
    return this.http.get<Phone>(this.urlPhone + id ,httpOptions)
    .pipe(
      catchError(handleError)
  );
  }

  deletePhone(phone:Phone) : Observable<Phone> {
    return this.http.delete<Phone>(this.urlPhone + '/' + phone.id , httpOptions)
    .pipe(
      catchError(handleError)
  );
  }

  updatePhone(phone :Phone) : Observable<Phone> {
    return this.http.put<Phone>(this.urlPhone + '/' + phone.id ,phone , httpOptions)
    .pipe(
      catchError(handleError)
    );
  }

  createPhone(phone : Phone) : Observable<Phone> {
    return this.http.post<Phone>(this.urlPhone , phone , httpOptions)
    .pipe(
      catchError(handleError)
  );
  }
}

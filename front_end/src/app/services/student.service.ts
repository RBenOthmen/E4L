import { Student } from './../interfaces/Student';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AppError } from '../exceptions/AppError';
import { BadInput } from '../exceptions/BadInput';
import { NotFoundError } from '../exceptions/not-found-error';
import { User } from '../interfaces/user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json',
  }),
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private url = 'http://localhost:8000/dashboard/eleves';
  constructor(private http : HttpClient) { }

  signup(credentials : Student) : Observable<Student> {
    let student = {
      user_id : credentials.user_id,
      phone : credentials.phone,
      birth_date : credentials.birth_date,
    }
    return this.http.post<Student>(this.url , student , httpOptions)
    .pipe(
      catchError(this.handleError)
  );
  }

  private handleError(err : Response) {
    if (err.status == 400) {
      return throwError (() => new BadInput(err));
    }

    if (err.status == 404) {
      return throwError (() => new NotFoundError(err));
    }
   
    return throwError(() => new AppError(err));
  }
}

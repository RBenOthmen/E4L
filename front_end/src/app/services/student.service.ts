import { Student } from './../interfaces/Student';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AppError } from '../exceptions/AppError';
import { BadInput } from '../exceptions/BadInput';
import { NotFoundError } from '../exceptions/not-found-error';
import { Unauthorized } from '../exceptions/Unauthorized';
import { Forbidden } from '../exceptions/Forbidden';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private url = 'http://localhost:8000/core/students/';
  private urlStudent = 'http://localhost:8000/dashboard/eleves/';

  constructor(private http: HttpClient) {}

  signup(credentials: Student): Observable<Student> {
    let student = {
      user_id: credentials.user_id,
      phone: credentials.phone,
      birth_date: credentials.birth_date,
    };
    return this.http
      .post<Student>(this.url, student, httpOptions)
      .pipe(catchError(this.handleError));
  }

  getStudents(): Observable<Student[]> {
    return this.http
      .get<Student[]>(this.url, httpOptions)
      .pipe(catchError(this.handleError));
  }

  getStudent(id: string): Observable<Student> {
    return this.http
      .get<Student>(this.url + '/' + id, httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(err: Response) {
    console.log(err);
    if (err.status == 400) {
      return throwError(() => new BadInput(err));
    }

    if (err.status == 404) {
      return throwError(() => new NotFoundError(err));
    }

    if (err.status == 401) {
      return throwError(() => new Unauthorized(err));
    }

    // if (err.status == 204) {
    //   return throwError (() => new NoContent(err));
    // }

    if (err.status == 403) {
      return throwError(() => new Forbidden(err));
    }

    return throwError(() => new AppError(err));
  }
}

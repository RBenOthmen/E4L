
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AppError } from '../exceptions/AppError';
import { BadInput } from '../exceptions/BadInput';
import { Teacher } from '../interfaces/Teacher';
import { NotFoundError } from '../exceptions/not-found-error';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json',
  }),
}

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private urlTeacher = 'http://localhost:8000/dashboard/professeurs/';

  // core/teachers => list users who have role = 'T'
  private urlUser = 'http://localhost:8000/core/teachers';
  constructor(
    private http : HttpClient
  ) { }

  getTeachers() : Observable<Teacher[]>{
    return this.http.get<Teacher[]>(this.urlUser,httpOptions)
    .pipe(
      catchError(this.handleError)
  );
  }

  deleteTeacher(teacher:Teacher) : Observable<Teacher> {
    return this.http.delete<Teacher>(this.urlTeacher + '/' + teacher.id , httpOptions)
    .pipe(
      catchError(this.handleError)
  );
  }

  updateTeacher(teacher :Teacher) : Observable<Teacher> {
    return this.http.put<Teacher>(this.urlTeacher + '/' + teacher.id ,teacher , httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  CreateTeacher(teacher : Teacher) : Observable<Teacher> {
    return this.http.post<Teacher>(this.urlTeacher , teacher , httpOptions)
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

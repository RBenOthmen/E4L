import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AppError } from '../exceptions/AppError';
import { BadInput } from '../exceptions/BadInput';
import { Teacher } from '../interfaces/Teacher';
import { NotFoundError } from '../exceptions/not-found-error';
import { Student } from '../interfaces/Student';
import { Unauthorized } from '../exceptions/Unauthorized';
import { Forbidden } from '../exceptions/Forbidden';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  // private urlCoreTeacher = 'http://localhost:8000/core/teachers';
  // private urlDashboardStudent = 'http://localhost:8000/dashboard/eleves/';
  private urlStudents = 'http://localhost:8000/core/students/';
  private urlTeachers = 'http://localhost:8000/core/teachers/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  //--------------------------------------------------------------- Teachers management
  getTeachers(): Observable<Teacher[]> {
    return this.http
      .get<Teacher[]>(this.urlTeachers, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getTeacher(id: string): Observable<Teacher> {
    return this.http
      .get<Teacher>(this.urlTeachers + id, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  deleteTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http
      .delete<Teacher>(this.urlTeachers + teacher.id, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  updateTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http
      .put<Teacher>(this.urlTeachers + teacher.id, teacher, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  CreateTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http
      .post<Teacher>(this.urlTeachers, teacher, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  //--------------------------------------------------------------- Students management
  getStudents(): Observable<Student[]> {
    return this.http
      .get<Student[]>(this.urlStudents, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getStudent(id: number): Observable<Student> {
    return this.http
      .get<Student>(this.urlStudents + id, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  deleteStudent(student: Student): Observable<Student> {
    return this.http
      .delete<Student>(this.urlStudents + student.id, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  updateStudent(student: Student): Observable<Student> {
    return this.http
      .put<Student>(this.urlStudents + student.id + '/', student, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  CreateStudent(student: Student): Observable<Student> {
    return this.http
      .post<Student>(this.urlStudents, student, this.httpOptions)
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

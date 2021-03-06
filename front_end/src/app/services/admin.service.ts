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
import { User } from '../interfaces/user';


const httpOptionsForComment = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  // private urlCoreTeacher = 'http://localhost:8000/core/teachers';
  // private urlDashboardStudent = 'http://localhost:8000/dashboard/eleves/';
  private baseUrl = 'http://localhost:8000/';
  private urlUsers = this.baseUrl + 'core/users/';
  private urlStudents = this.baseUrl + 'core/students/';
  private urlTeachers = this.baseUrl + 'core/teachers/';

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
      .put<Student>(
        this.urlStudents + student.id + '/',
        student,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  CreateStudent(student: Student): Observable<Student> {
    return this.http
      .post<Student>(this.urlStudents, student, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
  //////////////////////////////////////

  getComments(u_id: number): Observable<Comment[]> {
    return this.http
      .get<Comment[]>(this.baseUrl + 'dashboard/getusercomments/' + u_id, httpOptionsForComment)
      .pipe(catchError(this.handleError));
  }

  getComment(comment_id: number): Observable<Comment> {
    return this.http
      .get<Comment>(this.baseUrl + 'dashboard/comments/' + comment_id, httpOptionsForComment)
      .pipe(catchError(this.handleError));
  }

  modifyCommentState(comment_id: number, commentState: boolean): Observable<Comment> {
    return this.http
      .patch<Comment>(this.baseUrl + 'dashboard/comments/' + comment_id + '/',
      { state: commentState},
      this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  //--------------------------------------------------------------- Users management

  CreateUser(user: User): Observable<Teacher> {
    return this.http
      .post<Teacher>(this.baseUrl + 'core/create/', user, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  updateUser(user: User): Observable<User> {
    console.log(user);
    return this.http
      .put<User>(this.urlUsers + user.id + '/', user, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  deleteUser(user: User): Observable<User> {
    return this.http
      .delete<User>(this.urlUsers + user.id, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(this.urlUsers, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getUser(id : string): Observable<User[]> {
    return this.http
      .get<User[]>(this.urlUsers + id + '/', this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  activateUser(user: User): Observable<User> {
    return this.http
      .post<User>(
        this.baseUrl + 'core/activate/' + user.id + '/',
        user,
        this.httpOptions
      )
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

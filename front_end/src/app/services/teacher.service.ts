import { Review } from './../interfaces/Review';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, tap } from 'rxjs';
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

  private baseUrl = 'http://localhost:8000/'

  private urlTeacher = this.baseUrl+'dashboard/professeurs/';

  // core/teachers => list users who have role = 'T'
  private urlUser = this.baseUrl+'core/teachers/';
  constructor(
    private http : HttpClient
  ) { }

  getTeacher(id : string) : Observable<Teacher>{
    return this.http.get<Teacher>(this.urlTeacher + id ,httpOptions)
    .pipe(
      catchError(this.handleError)
  );
  }

  getTeachers() : Observable<Teacher[]>{
    return this.http.get<Teacher[]>(this.urlTeacher,httpOptions)
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

  /////////////////////////////////////////////

  getStudentReview(teacher_id : string, student_id : number) : Observable<Teacher[]> {
    return this.http.post<Teacher[]>(this.baseUrl + 'dashboard/getstudentreview/' , { professeur_id : teacher_id, user_id : student_id} , httpOptions)
    .pipe(
      catchError(this.handleError)
  );
  }


  reviewTeacher(teacher : Teacher, student_id : number, rate:number) : Observable<Teacher> {
    return this.http.post<Teacher>(this.baseUrl + 'dashboard/reviews/' , {professeur_id : teacher.id, user_id : student_id, rate : rate} , httpOptions)
    .pipe(
      catchError(this.handleError)
  );
  }

  updateReview(review : Review) : Observable<Teacher> {
    return this.http.put<Teacher>(this.baseUrl + 'dashboard/reviews/' +review.id +'/', review , httpOptions)
    .pipe(
      catchError(this.handleError)
  );
  }

  getComments(id1 : number, id2:number) : Observable<Teacher> {
    return this.http.post<Teacher>(this.baseUrl + 'dashboard/getcomments/', {task_manager_id : id1, user_id : id2} , httpOptions)
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

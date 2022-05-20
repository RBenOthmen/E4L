import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AppError } from '../exceptions/AppError';
import { BadInput } from '../exceptions/BadInput';
import { Lesson } from '../interfaces/Lesson';
import { NotFoundError } from '../exceptions/not-found-error';
import { LessonElement } from '../interfaces/LessonElement';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json',
  }),
}

@Injectable({
  providedIn: 'root'
})
export class LessonsService {
  private baseUrl = 'http://localhost:8000/dashboard/';
  private url = 'http://localhost:8000/dashboard/lessons/';
  constructor(
    private http : HttpClient
  ) { }

  getLessons() : Observable<Lesson[]>{
    return this.http.get<Lesson[]>(this.url,httpOptions)
    .pipe(
      catchError(this.handleError)
  );
  }

  getElementById(id : string) : Observable<LessonElement>{
    return this.http.get<LessonElement>(this.baseUrl+"lessonElements/" + id + '/',httpOptions)
    .pipe(
      catchError(this.handleError)
  );
  }

  getNextLessonElement(element_id : string) : Observable<LessonElement>{
    return this.http.get<LessonElement>(this.baseUrl+ 'nextElement/' + element_id +'/',httpOptions)
    .pipe(
      catchError(this.handleError)
  );
  }

  getLessonElements(lesson_id : number) : Observable<LessonElement[]>{
    return this.http.get<LessonElement[]>(this.baseUrl+ 'getLessonElements/' + lesson_id +'/',httpOptions)
    .pipe(
      catchError(this.handleError)
  );
  }

  getLessonsByCategory(category : string) : Observable<Lesson[]>{
    return this.http.get<Lesson[]>(this.url + category + '/' ,httpOptions)
    .pipe(
      catchError(this.handleError)
  );
  }

  deleteLesson(Lesson:Lesson) : Observable<Lesson> {
    return this.http.delete<Lesson>(this.url + '/' + Lesson.id , httpOptions)
    .pipe(
      catchError(this.handleError)
  );
  }

  updateLesson(Lesson :Lesson) : Observable<Lesson> {
    return this.http.put<Lesson>(this.url + '/' + Lesson.id ,Lesson , httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  CreateLesson(Lesson : Lesson) : Observable<Lesson> {
    return this.http.post<Lesson>(this.url , Lesson , httpOptions)
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

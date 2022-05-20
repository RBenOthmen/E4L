import { Progress } from './../interfaces/Progress';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, tap } from 'rxjs';
import { handleError } from './../exceptions/handleError';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json',
  }),
}

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  private baseUrl = 'http://localhost:8000/dashboard/'

  private urlStudent = this.baseUrl+'eleves/';

  constructor(
    private http : HttpClient
  ) { }

  createStudentProgess(progress : Progress) : Observable<Progress>{
    return this.http.post<Progress>(this.urlStudent + progress.eleve_id +'/progress/', progress,httpOptions)
    .pipe(
      catchError(handleError)
  );
  }

  updateStudentProgess(progress :Progress) : Observable<Progress> {
    return this.http.put<Progress>(this.urlStudent + progress.eleve_id + '/progress/' + progress.id +'/', progress, httpOptions)
    .pipe(
      catchError(handleError)
  );
  }

  getCurrentProgess(eleve_id : string, lesson_id : string) : Observable<Progress> {
    return this.http.post<Progress>(this.baseUrl + 'getProgress/', {eleve_id:eleve_id, lesson_id:lesson_id}, httpOptions)
    .pipe(
      catchError(handleError)
  );
  }

  
}

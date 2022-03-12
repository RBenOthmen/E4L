import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private url = 'http://localhost:5000/dashboard/eleves';
  constructor() { }

  /*signup(credentials : User) : Observable<User> {
    return this.http.post<User>(this.url , credentials , httpOptions)
    .pipe(
      catchError(this.handleError)
  );
  }*/
}

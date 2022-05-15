import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Observable, catchError, throwError, tap } from 'rxjs';
import { AppError } from '../exceptions/AppError';
import { BadInput } from '../exceptions/BadInput';
import { NotFoundError } from '../exceptions/not-found-error';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8000/';
  url: string = 'http://localhost:4200';
  private urlUser = this.baseUrl + 'core/users/';

  constructor(private httpClient: HttpClient, private http: HttpClient) {}

  postUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.url, user);
  }

  getUser(id: string): Observable<User> {
    return this.http
      .get<User>(this.urlUser + id, httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(err: Response) {
    if (err.status == 400) {
      return throwError(() => new BadInput(err));
    }

    if (err.status == 404) {
      return throwError(() => new NotFoundError(err));
    }

    return throwError(() => new AppError(err));
  }

  
}

import { BadInput } from '../exceptions/BadInput';
import { Token } from './../interfaces/Token';
import { Observable, map, tap, throwError, catchError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { NotFoundError } from '../exceptions/not-found-error';
import { AppError } from '../exceptions/AppError';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json',
  }),
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost:5000/auth/';
  constructor(
    private http : HttpClient
  ) { }

  login(credentials : User) : Observable<User> {
    //let isLogin : boolean =false;
    return this.http.post<User>(this.url + 'jwt/create/' , credentials , httpOptions);
      /*.pipe(
        tap(
      })).subscribe();
      console.log(isLogin)
    return isLogin;*/
  }

  signup(credentials : User) : Observable<User> {
    let user = {
      username : credentials.username,
      password : credentials.password,
      email : credentials.email,
      first_name : credentials.first_name,
      last_name : credentials.last_name

    }

    console.log(user)
    return this.http.post<User>(this.url + 'users/' , user , httpOptions)
    .pipe(
      catchError(this.handleError)
  );
  }

  

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    /*const helper = new JwtHelperService();

    let token = localStorage.getItem('token');

    if (!token)
      return false;
    
    const isExpired = helper.isTokenExpired(token);

    return !isExpired;*/
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

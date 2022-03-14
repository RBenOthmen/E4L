import { Teacher } from './../interfaces/Teacher';
import { Student } from './../interfaces/Student';

import { BadInput } from '../exceptions/BadInput';
import { Token } from './../interfaces/Token';
import { Observable, map, tap, throwError, catchError, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { NotFoundError } from '../exceptions/not-found-error';
import { AppError } from '../exceptions/AppError';
import { Router } from '@angular/router';
import { Unauthorized } from '../exceptions/Unauthorized';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json',
  }),
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _LoggedIn = new BehaviorSubject<boolean>(false);
  LoggedIn = this._LoggedIn.asObservable();

  private url = 'http://localhost:8000/';
  constructor(private http : HttpClient) {
      const token = localStorage.getItem('token');
      this._LoggedIn.next(!!token);
   }

  login(credentials : User) : Observable<User> {
    //let isLogin : boolean =false;
    return this.http.post<User>(this.url + 'auth/jwt/create/' , credentials , httpOptions)
      .pipe(
        catchError(this.handleError),
        tap(response => {
          if (response && response.access) {
            this._LoggedIn.next(true);
            localStorage.setItem('token', response.access);
          }
        })
      );
  }

  signup(credentials : User) : Observable<User> {
    let user = {
      username : credentials.username,
      password : credentials.password,
      email : credentials.email,
      first_name : credentials.first_name,
      last_name : credentials.last_name
    }
    
    return this.http.post<User>(this.url + 'auth/users/' , user , httpOptions)
    .pipe(
      catchError(this.handleError),
      tap(response => {
        
        credentials.user_id = response.id;
        
        if(credentials.type == "student")
          this.createStudent(credentials)
        else if (credentials.type == "teacher")
          this.createTeacher(credentials)
        
      })
  );
  }

  createStudent(credentials : User) {
    let student : Student = {
      user_id : credentials.user_id,
      phone : credentials.phone,
      birth_date : credentials.birth_date,
    }
    this.http.post<User>(this.url + 'dashboard/eleves/' , student , httpOptions).subscribe(
      response => console.log(response)
    )
  }

  createTeacher(credentials : User) {
    let teacher : Teacher = {
      user_id : credentials.user_id,
      phone : credentials.phone,
      birth_date : credentials.birth_date,
      formation : credentials.formation,
    }
    console.log(teacher)
    this.http.post<User>(this.url + 'dashboard/professeurs/' , teacher , httpOptions).subscribe(
      response => console.log(response)
    )
  }

  getCurrentUser() {
    const token = localStorage.removeItem('token');
    

  }

  

  logout() {
    localStorage.removeItem('token');
    this._LoggedIn.next(false);
  }

  isLoggedIn() {
    /*const helper = new JwtHelperService();*/
    let token = localStorage.getItem('token');
    
    if (!token){
      return false;
    }
    return true;
    
    /*const isExpired = helper.isTokenExpired(token);
    return !isExpired;*/
  }

  private handleError(err : Response) {
    if (err.status == 400) {
      return throwError (() => new BadInput(err));
    }

    if (err.status == 404) {
      return throwError (() => new NotFoundError(err));
    }

    if (err.status == 401) {
      return throwError (() => new Unauthorized(err));
    }
   
    return throwError(() => new AppError(err));
  }
}

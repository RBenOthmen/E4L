import { Forbidden } from './../exceptions/Forbidden';
import { BadInput } from '../exceptions/BadInput';
import { NotFoundError } from '../exceptions/not-found-error';
import { Unauthorized } from '../exceptions/Unauthorized';
import { AppError } from '../exceptions/AppError';
import { NoContent } from './../exceptions/NoContent';
import { Activate } from './../interfaces/Activate';
import { Teacher } from './../interfaces/Teacher';
import { Student } from './../interfaces/Student';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Token } from './../interfaces/Token';
import { Observable, map, tap, throwError, catchError, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';




const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json',
  }),
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth! : boolean;

  signIn(){
      this.isAuth = true;
  }

  signOut(){
    this.isAuth = false;
  }

  // private _LoggedIn = new BehaviorSubject<boolean>(false);
  // LoggedIn = this._LoggedIn.asObservable();

  helper = new JwtHelperService();

  currentUser : User = {
    email : '',
    username : ''
  }


  private url = 'http://localhost:8000/';
  constructor(private http : HttpClient) {
      // const token = localStorage.getItem('token');
      // this._LoggedIn.next(!!token);
   }

   getToken() {
    const token = localStorage.getItem('token');
    if (token)
      console.log(token)
  }

  getId() : number{
    const token = localStorage.getItem('token');
    return this.helper.decodeToken(<string>token).user_id;
  }

  getRoleId() : number{
    const token = localStorage.getItem('token');
    return this.helper.decodeToken(<string>token).id;
  }



  login(credentials : User) : Observable<User> {
    //let isLogin : boolean =false;
    return this.http.post<User>(this.url + 'core/jwt/create/' , credentials , httpOptions)
      .pipe(
        catchError(this.handleError),
        tap(response => {
          const decodedToken = this.helper.decodeToken(response.access);
          if (response && response.access) {
            // this._LoggedIn.next(true);
            localStorage.setItem('token', response.access);
            this.getUserDetails().subscribe();
          }
        })
      );
  }

  signup(credentials : User) : Observable<User> {
    credentials.role = credentials.type == "teacher" ? 'T' : 'S';

    return this.http.post<User>(this.url + 'auth/users/' , credentials , httpOptions)
    .pipe(
      catchError(this.handleError),
      tap(response => {
        console.log(response)
        console.log(response.access)
        // if (credentials.type == "teacher") {
        //   credentials.user_id = response.id;
        //   this.createTeacher(credentials)
        // }


      })
  );
  }

  // return either 204 no content || 400 bad request || 403 forbidden
  activateAccount(uid : string , token : string) : Observable<Activate> {
    return this.http.post<Activate>(this.url + 'auth/users/activation/' , {uid : uid , token : token} , httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }


  // return teacher info
  getCurrentTeacherInfo() : Observable<Teacher> {
    let token = localStorage.getItem('token');
    let Authorization = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization' : 'JWT '+token
      }),
    }

    return this.http.get<Teacher>(this.url + 'dashboard/professeurs/me/' , Authorization);

  }



  createTeacher(teacher : Teacher) : Observable<Teacher>{
    // let teacher : Teacher = {
    //   user_id : credentials.user_id,
    // }
    return this.http.post<Teacher>(this.url + 'dashboard/professeurs/' , teacher , httpOptions);
  }

  getUserId(id : number) : Observable<User>{
    console.log(this.currentUser.role)
    if (this.currentUser.role == 'S')
      return this.http.get<User>(this.url + 'dashboard/studentinfo/' + id +'/' , httpOptions);
    return this.http.get<User>(this.url + 'dashboard/teacherinfo/' + id +'/', httpOptions);

  }


  getUserDetails() : Observable<User> {
    let token = localStorage.getItem('token');
    let Authorization = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization' : 'JWT '+token
      }),
    }
    console.log('im here')
    return this.http.get<User>(this.url + 'auth/users/me/' , Authorization)
    .pipe(
      catchError(this.handleError),
      tap( response => {
        this.currentUser = response
        this.getUserId(<number>response.id).subscribe(
              response => this.currentUser.user_id = response.id
            );
      })
      );

  }

  // tap( response => {
  //   this.currentUser.email = response.email;
  //   this.currentUser.username = response.username;
  //   this.currentUser.first_name = response.first_name;
  //   this.currentUser.last_name = response.last_name;
  //   this.currentUser.phone = response.phone;
  //   this.currentUser.birth_date = response.birth_date;
  //   this.currentUser.role = response.role;
  //   this.getUserId(<number>response.id).subscribe(
  //     response => this.currentUser.user_id = response.id
  //   );
  // }




  logout() {
    localStorage.removeItem('token');
    this.currentUser = {
      email : '',
      username : ''
    }
    // this._LoggedIn.next(false);
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    if (!token){
      return false;
    }
    const isExpired = this.helper.isTokenExpired(token);
    return !isExpired;
  }


  updateUser(data : any):Observable<User>{
    let token = localStorage.getItem('token');
    let authorization = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization' : 'JWT '+token
      }),
    }


    return this.http.patch<User>(this.url+"auth/users/me/", data, authorization).pipe(
      catchError(this.handleError));
    }

    updateUserVideo(data : any):Observable<User>{
      let token = localStorage.getItem('token');
      let authorization = {
        headers: new HttpHeaders({
          // 'Content-Type' : 'multipart/form-data',
          'Authorization' : 'JWT '+token
        }),
      }

      let formData = new FormData();
      formData.append('video', data);
      return this.http.patch<User>(this.url+"dashboard/professeurs/me/", formData, authorization).pipe(
        catchError(this.handleError));
    }

    updateUserImage(data : any):Observable<User>{
      let token = localStorage.getItem('token');
      let authorization = {
        headers: new HttpHeaders({
          // 'Content-Type' : 'multipart/form-data',
          'Authorization' : 'JWT '+token
        }),
      }

      let formData = new FormData();
      formData.append('image', data);
      return this.http.patch<User>(this.url+"auth/users/me/", formData, authorization).pipe(
        catchError(this.handleError));
    }

    createUserVideo(data : any, id : number):Observable<User>{
      let authorization = {
        headers: new HttpHeaders({
          // 'Content-Type' : 'multipart/form-data',
        }),
      }

      let formData = new FormData();
      formData.append('video', data);
      return this.http.patch<User>(this.url+"dashboard/professeurs/" + id + '/', formData, authorization).pipe(
        catchError(this.handleError));
    }

  changePassword(user : any):Observable<User>{
    let token = localStorage.getItem('token');
    let authorization = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization' : 'JWT '+token
      }),
    }
    console.log(user)
    return this.http.post<User>(this.url+"auth/users/set_password/", user, authorization).pipe(
      catchError(this.handleError));
    }

  changeUsername(user : any):Observable<User>{
    let token = localStorage.getItem('token');
    let authorization = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization' : 'JWT '+token
      }),
    }
    console.log(user)
    return this.http.post<User>(this.url+"auth/users/set_username/", user, authorization).pipe(
      catchError(this.handleError));
  }


  //sends recovery email to change password
  // returns 204 no content || 400 bad request
  resetPassword(email : string) {
    console.log(email)

    return this.http.post<User>(this.url+"auth/users/reset_password/", {email:email}, httpOptions).pipe(
      catchError(this.handleError));
  }

  //returns 204 no content || 400 bad request
  resetPasswordConfirm(uid : string,token : string,new_password : string,re_new_password : string ) {

    return this.http.post<User>(this.url+"auth/users/reset_password_confirm/",
     {uid : uid, token : token , new_password : new_password , re_new_password : re_new_password},
     httpOptions).pipe(
      catchError(this.handleError));
  }

  private handleError(err : Response) {
    console.log(err)
    if (err.status == 400) {
      return throwError (() => new BadInput(err));
    }

    if (err.status == 404) {
      return throwError (() => new NotFoundError(err));
    }

    if (err.status == 401) {
      return throwError (() => new Unauthorized(err));
    }

    // if (err.status == 204) {
    //   return throwError (() => new NoContent(err));
    // }

    if (err.status == 403) {
      return throwError (() => new Forbidden(err));
    }

    return throwError(() => new AppError(err));
  }
}

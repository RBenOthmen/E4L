import { Comment } from 'src/app/interfaces/Comment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AppError } from '../exceptions/AppError';
import { BadInput } from '../exceptions/BadInput';
import { NotFoundError } from '../exceptions/not-found-error';
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
export class TaskManagerService {
  private baseUrl = 'http://localhost:8000/';
  private urlUsers = this.baseUrl + 'core/users/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  selectedUser!: User;
  comments: Comment[] = [];

  setSelectedUser(user: User) {
    this.selectedUser = user;
  }

  addToComments(comment: Comment) {
    this.comments.push(comment);
  }

  getAllComments(): Comment[] {
    return this.comments;
  }

  constructor(private http: HttpClient) {}

  createComment(
    tmId: number,
    userId: number,
    comment: Comment
  ): Observable<Comment> {
    console.log(tmId, ' / ' + userId);
    return this.http
      .post<Comment>(
        this.baseUrl + 'dashboard/comments/',
        { task_manager_id: tmId, user_id: userId, comment: comment },
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  updateComment(tmId: number, userId: number, comment: string, id: number): Observable<Comment> {
    console.log(tmId, ' / ' + userId);
    console.log("comment ");
    console.log(comment);
    return this.http
      .put<Comment>(
        this.baseUrl + 'dashboard/comments/' + id + '/',
        { task_manager_id: tmId, user_id: userId, comment: comment },
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  deleteComment(commentId: number): Observable<Comment> {
    console.log("service comment id");
    console.log(commentId);
    return this.http
      .delete<Comment>(
        this.baseUrl + 'dashboard/comments/' + commentId,
        // { comment: commentId },
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  getComments(tm_id: number, u_id: number): Observable<Comment[]> {
    return this.http
      .post<Comment[]>(
        this.baseUrl + 'dashboard/getcomments/',
        { task_manager_id: tm_id, user_id: u_id },
        httpOptionsForComment
      )
      .pipe(catchError(this.handleError));
  }

  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(this.urlUsers, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getUser(id: number): Observable<User> {
    return this.http
      .get<User>(this.urlUsers + id, this.httpOptions)
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

    if (err.status == 403) {
      return throwError(() => new Forbidden(err));
    }

    return throwError(() => new AppError(err));
  }

  getCurrentUserInfo(): Observable<User> {
    let token = localStorage.getItem('token');
    let Authorization = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + token,
      }),
    };
    return this.http.get<User>(this.baseUrl + 'auth/users/me/', Authorization);
  }
}

import { Forbidden } from './../exceptions/Forbidden';
import { BadInput } from '../exceptions/BadInput';
import { NotFoundError } from '../exceptions/not-found-error';
import { Unauthorized } from '../exceptions/Unauthorized';
import { AppError } from '../exceptions/AppError';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Task } from '../interfaces/Task';
import { Teacher } from '../interfaces/Teacher';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json',
  }),
}

@Injectable({
  providedIn: 'root'
})
export class TaskService implements OnInit{

  private url = 'http://localhost:8000/dashboard/professeurs/';

  constructor(
    private http : HttpClient,
    private authService : AuthService
  ) { }
  
  ngOnInit(): void {

    
  }

  getTasks(id : number) : Observable<Task[]>{
    
    
    return this.http.get<Task[]>(this.url + id + '/tasks/').pipe(
      catchError(this.handleError));
      console.log('teacher id '+ id)
  }

  deleteTask(task:Task,id : number) : Observable<Task> {
    const url = `${this.url}${id}/tasks/${task.id}`;
    return this.http.delete<Task>(url);
  }

  updateTaskCompletion(task :Task, id :number) : Observable<Task> {
    const url = `${this.url}${id}/tasks/${task.id}/`;
    return this.http.patch<Task>(url,{is_completed : task.is_completed} , httpOptions);
  }

  addTask(task : Task, id :number) : Observable<Task> {
    return this.http.post<Task>(this.url + id + '/tasks/', {title : task.title, end_date : task.end_date}).pipe(
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

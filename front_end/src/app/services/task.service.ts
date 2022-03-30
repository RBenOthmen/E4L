import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/Task';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json',
  }),
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private url = 'http://localhost:8000/';

  constructor(
    private http : HttpClient
  ) { }

  getTasks() : Observable<Task[]>{
    //const tasks = of(TASKS);
    //return tasks;

    return this.http.get<Task[]>(this.url);
  }

  deleteTask(task:Task) : Observable<Task> {
    const url = `${this.url}/${task.id}`;
    return this.http.delete<Task>(url);
  }

  updateTaskReminder(task :Task) : Observable<Task> {
    const url = `${this.url}/${task.id}`;
    return this.http.put<Task>(url,task , httpOptions);
  }

  addTask(task : Task) : Observable<Task> {
    return this.http.post<Task>(this.url , task , httpOptions);
  }
}

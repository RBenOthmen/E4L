import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { TaskService } from 'src/app/services/task.service';
import { Task } from '../../interfaces/Task';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks : Task[] = [];
  color !: string;
  buttonText : string = 'add';
  title = 'To do list';
  id !: number;
  showAddTask : boolean = false;
  subscription !: Subscription;
  constructor(private uiService : UiService,private router : Router, private taskService : TaskService,private authService : AuthService) { 
    this.subscription = this.uiService.onToggle().subscribe(value => this.showAddTask = value);
    
  }

  ngOnInit(): void {
    let id : number = 0;
    this.authService.getCurrentTeacherInfo().subscribe(
      response => { 
        id = <number>response.id
        console.log('affich response '+id)
        this.taskService.getTasks(id).subscribe((tasks) => this.tasks = tasks);
    }
    );
    
    
  }

  deleteTask(task : Task) {
    
    let id : number =0;
    this.authService.getCurrentTeacherInfo().subscribe(
      response => { 
        id = <number>response.id
        console.log('delete task response '+id)
        
        this.taskService.deleteTask(task,id).subscribe(() => this.tasks = 
        this.tasks.filter(t => t.id !== task.id));
        console.log('task deleted')
      });
  }

  toggleReminder(task : Task) {
    let id : number =0;
    this.authService.getCurrentTeacherInfo().subscribe(
      response => { 
        id = <number>response.id
        console.log('update task response '+id)
        
        console.log(task.is_completed)
        task.is_completed = !task.is_completed;
        console.log(task.is_completed)
        this.taskService.updateTaskCompletion(task, id).subscribe();

      });
  }

  addTask(task : Task) {
    let id : number =0;
    this.authService.getCurrentTeacherInfo().subscribe(
      response => { 
        this.id = <number>response.id
        console.log('add task response '+this.id)
        this.taskService.addTask({title : task.title, end_date : task.end_date}, this.id).subscribe((task) => {
          this.tasks.push(task)
          console.log('task added')
        });
        
      });
      

      
    
  }

  getId() {
    let id : number =0;
    this.authService.getCurrentTeacherInfo().subscribe(
      response => { 
        id = <number>response.id
        console.log('add task response '+this.id)
        
      }
      );

      return this.id;
  }

  toggleAddTask() {
    this.uiService.toggleAddTask();
    if (this.showAddTask == false) {
      this.buttonText = 'add';
    } else {
      this.buttonText = 'close';
    }
 }

 getColor() {
   return this.showAddTask ? 'red' : 'green';
 }

//  hasRoute(route : string) {
//    return this.router.url == route;
//  }
}

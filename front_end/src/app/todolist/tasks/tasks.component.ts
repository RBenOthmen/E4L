import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { TaskService } from 'src/app/services/task.service';
import { Task } from '../../interfaces/Task';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks : Task[] = [];
  color !: string;
  buttonText : string = 'Add';
  title = 'Task Manager';
  showAddTask : boolean = false;
  subscription !: Subscription;
  constructor(private uiService : UiService,private router : Router, private taskService : TaskService) { 
    this.subscription = this.uiService.onToggle().subscribe(value => this.showAddTask = value);
    
  }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => this.tasks = tasks);
    
  }

  deleteTask(task : Task) {
    this.taskService.deleteTask(task).subscribe(() => this.tasks = 
    this.tasks.filter(t => t.id !== task.id));
  }

  toggleReminder(task : Task) {
    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder(task).subscribe();
  }

  addTask(task : Task) {
    this.taskService.addTask(task).subscribe((task) => this.tasks.push(task));
  }

  toggleAddTask() {
    this.uiService.toggleAddTask();
    if (this.showAddTask == false) {
      this.buttonText = 'Add';
    } else {
      this.buttonText = 'Close';
    }
 }

 getColor() {
   return this.showAddTask ? 'red' : 'green';
 }

//  hasRoute(route : string) {
//    return this.router.url == route;
//  }
}

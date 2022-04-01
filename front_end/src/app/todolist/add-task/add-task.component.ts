import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/interfaces/Task';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  text !: string;
  date !: string;
  @Output('onAddTask') onAddTask: EventEmitter<Task> = new EventEmitter();
  showAddTask!:boolean;
  subscription!:Subscription;
  constructor(private uiService : UiService, private authService : AuthService) { 
    this.subscription = this.uiService.onToggle().subscribe(value => this.showAddTask = value);
   }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.text) {
      alert('add a task!');
      return;
    }

    console.log(this.date)
    const newTask : Task = {
      title : this.text,
      end_date : this.date,
    }

    this.onAddTask.emit(newTask);

    this.text='';
    this.date='';
  }

}

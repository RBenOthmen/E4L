import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Task } from '../../interfaces/Task';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  @Input('task') task !:Task;
  @Output('onDeleteTask') onDeleteTask: EventEmitter<Task> = new EventEmitter();
  @Output('onToggleReminder') onToggleReminder: EventEmitter<Task> = new EventEmitter();
  faTimes = faTimes;
  constructor() { }

  ngOnInit(): void {
  }

  onDelete(task : Task) {
    this.onDeleteTask.emit(task);
  }

  onToggle(task : Task) {
    this.onToggleReminder.emit(task);
  }

}

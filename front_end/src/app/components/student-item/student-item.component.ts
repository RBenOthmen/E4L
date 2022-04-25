import { Component, OnInit, Input } from '@angular/core';
import { Student } from 'src/app/interfaces/Student';

@Component({
  selector: 'app-student-item',
  templateUrl: './student-item.component.html',
  styleUrls: ['./student-item.component.css']
})
export class StudentItemComponent implements OnInit {
  @Input('student') student !: Student;

  constructor() { }

  ngOnInit(): void {
  }

}

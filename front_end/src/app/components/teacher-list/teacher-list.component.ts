import { TeacherService } from './../../services/teacher.service';
import { Component, OnInit } from '@angular/core';
import { Teacher } from 'src/app/interfaces/Teacher';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit {
  teachers !: Teacher[];
  

  constructor(private teacherService : TeacherService) { }

  ngOnInit(): void {
    this.teacherService.getTeachers().subscribe(result => {
      this.teachers = result
      console.log(this.teachers)})
    
  }

}

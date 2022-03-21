import { TeacherService } from './../../services/teacher.service';
import { Component, OnInit } from '@angular/core';
import { Teacher } from 'src/app/interfaces/Teacher';
import { AppError } from 'src/app/exceptions/AppError';
import { NotFoundError } from 'src/app/exceptions/not-found-error';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit {
  teachers !: Teacher[];
  

  constructor(private teacherService : TeacherService) { }

  ngOnInit(): void {
    this.teacherService.getTeachers().subscribe({
      next: result => this.teachers = result
      ,error : (err : AppError) => {
        if (err instanceof NotFoundError){
         console.log(err)
        }
      }
    });
  }

}

import { NotFoundError } from './../../exceptions/not-found-error';
import { StudentService } from './../../services/student.service';
import { Student } from './../../interfaces/Student';
import { Component, OnInit } from '@angular/core';
import { AppError } from 'src/app/exceptions/AppError';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {
  students !: Student[];

  constructor(private studentService : StudentService) { }

  ngOnInit(): void {
    this.studentService.getStudents().subscribe({
      next: result => this.students = result
      ,error : (err : AppError) => {
        if (err instanceof NotFoundError){
         console.log(err)
        }
      }
    });
  }

}

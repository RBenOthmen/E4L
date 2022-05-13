import { TeacherService } from './../../services/teacher.service';
import { Component, OnInit } from '@angular/core';
import { Teacher } from 'src/app/interfaces/Teacher';
import { AppError } from 'src/app/exceptions/AppError';
import { NotFoundError } from 'src/app/exceptions/not-found-error';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit {
  teachers !: Teacher[];
  

  constructor(private teacherService : TeacherService,
              private loaderService : LoaderService) {
                this.loaderService.showLoader();
               }

  ngOnInit(): void {
    
    this.teacherService.getTeachers().subscribe({
      next: result => {
        this.teachers = result
        this.loaderService.hideLoader();
      }
      ,error : (err : AppError) => {
        // this.loaderService.hideLoader();
        if (err instanceof NotFoundError){
         console.log(err)
        }
      }
    });
  }

}

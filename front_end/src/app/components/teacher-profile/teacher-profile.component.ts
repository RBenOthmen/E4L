import { NotFoundError } from './../../exceptions/not-found-error';
import { TeacherService } from './../../services/teacher.service';
import { Component, OnInit } from '@angular/core';
import { Teacher } from 'src/app/interfaces/Teacher';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AppError } from 'src/app/exceptions/AppError';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css']
})
export class TeacherProfileComponent implements OnInit {

  teacher : Teacher= {
    first_name : ""
  };
  id !:string;

  constructor(private teacherService : TeacherService,private  route : ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = <string>params.get('id')
    })
    this.teacherService.getTeacher(this.id).subscribe({
      next : response => this.teacher = response
      ,error : (err : AppError) => {
        if (err instanceof NotFoundError){
         console.log(err)
        }
      }
    });
  }

}

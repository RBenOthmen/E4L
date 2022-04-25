import { Student } from './../../interfaces/Student';
import {NotFoundError} from './../../exceptions/not-found-error';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {AppError} from 'src/app/exceptions/AppError';
import {FormControl, Validators} from '@angular/forms';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {

  student: Student = {
    first_name: "",
  };
  id !: string;
  starRating = 0;

  ctrl = new FormControl(null, Validators.required);
  rating !: number;

  constructor(private studentService: StudentService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = <string>params.get('id')
    })
    this.studentService.getStudent(this.id).subscribe({
      next: response => (this.student = response)
      , error: (err: AppError) => {
        if (err instanceof NotFoundError) {
          console.log(err)
        }
      }
    });

  }

}

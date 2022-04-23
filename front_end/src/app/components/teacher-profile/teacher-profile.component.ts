import {NotFoundError} from './../../exceptions/not-found-error';
import {TeacherService} from './../../services/teacher.service';
import {Component, OnInit} from '@angular/core';
import {Teacher} from 'src/app/interfaces/Teacher';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {AppError} from 'src/app/exceptions/AppError';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css']
})
export class TeacherProfileComponent implements OnInit {

  teacher: Teacher = {
    first_name: "",
    rating: 0
  };
  id !: string;
  starRating = 0;

  ctrl = new FormControl(null, Validators.required);
  rating !: number;

  constructor(private teacherService: TeacherService, private route: ActivatedRoute) {
    console.log("teacher rating : " + this.teacher.rating);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = <string>params.get('id')
    })
    this.teacherService.getTeacher(this.id).subscribe({
      next: response => (this.teacher = response,
        console.log("teacher from onInit: " + this.teacher.rating,
          console.log(response)))
      , error: (err: AppError) => {
        if (err instanceof NotFoundError) {
          console.log(err)
        }
      }
    });

  }

  rate(rating: number) {
    console.log("teacher rating from rate fn: " + this.teacher.rating);
    this.rating = rating;
    console.log("teacher rating from rate params: " + rating);
    this.teacher.rating = rating;
    this.teacherService.updateTeacher(this.teacher);
    console.log("final teacher rating from rate fn: " + this.teacher.rating);
  }

}

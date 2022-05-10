import { Review } from './../../interfaces/Review';
import { AuthService } from './../../services/auth.service';
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
    rate: 0
  };
  id !: string;
  starRating = 0;

  avg_rating !: number;

  ctrl = new FormControl(null, Validators.required);

  teacherReview : Review = {
    rate : 0,
  }; 


  constructor(private teacherService: TeacherService, private route: ActivatedRoute,
    private authService : AuthService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = <string>params.get('id')
    })
    this.teacherService.getTeacher(this.id).subscribe({
      next: response => {
        this.teacher = response
      }
      , error: (err: AppError) => {
        if (err instanceof NotFoundError) {
          console.log(err)
        }
      }
    });


    this.teacherService.getStudentReview(this.id, this.authService.getId()).subscribe({
      next: response => {
        if (response[0]) {
          this.starRating = response[0].rate || 0;
          this.teacherReview = response[0];

        }
      }
      , error: (err: AppError) => {
        if (err instanceof NotFoundError) {
          console.log(err)
        }
      }
    });

    this.teacherService.getReview(this.id).subscribe({
      next: response => {
        // if (response[0]) {
        //   this.starRating = response[0].rate || 0;
        //   this.teacherReview = response[0];

        // }
        this.avg_rating = response.avg_rating || 0;
        console.log(this.avg_rating)
      }
      , error: (err: AppError) => {
        if (err instanceof NotFoundError) {
          console.log(err)
        }
      }
    });

  }

  rate(rate : number) {
    console.log(rate || 0)
    this.teacherReview.rate = rate;
    if (this.starRating == 0) {
      this.createRating(rate);
    } else {
      this.updateRating();
    }
  }

  createRating(rate : number) {
    this.teacherService.reviewTeacher(this.teacher,this.authService.getId(),rate).subscribe({
      next: response => {
        this.teacherReview = response;
      }
      , error: (err: AppError) => {
        if (err instanceof NotFoundError) {
          console.log(err)
        }
      }
    });
  }

  updateRating() {
    this.teacherService.updateReview(this.teacherReview).subscribe({
      next: response => {
        console.log(response)
      }
      , error: (err: AppError) => {
        if (err instanceof NotFoundError) {
          console.log(err)
        }
      }
    });
  }

}

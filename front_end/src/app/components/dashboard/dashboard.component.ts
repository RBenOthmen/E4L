import { LoaderService } from './../../services/loader.service';
import { LessonElement } from './../../interfaces/LessonElement';
import { ProgressService } from './../../services/progress.service';
import { AuthService } from 'src/app/services/auth.service';
import { Lesson } from 'src/app/interfaces/Lesson';
import { Component, Input, OnInit } from '@angular/core';
import { AppError } from 'src/app/exceptions/AppError';
import { NotFoundError } from 'rxjs';
import { LessonsService } from 'src/app/services/lessons.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  categories = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  isExpanded !: boolean;
  @Input('lesson') lesson !:Lesson;
  lessons !: Lesson[];
  categoryProgress : number = 0;
  // lessonElements !: LessonElement[];

  constructor(private authService :AuthService,
    private progressService : ProgressService,
    private lessonsService :LessonsService,
    private loaderService : LoaderService) { 
      this.loaderService.hideLoader();
      this.loaderService.showLoader();
    }

  ngOnInit(): void {
    
    this.lessonsService.getLessons().subscribe({
      next: response => {
        this.lessons = response;
        // console.log(response)
      }
      , error: (err: AppError) => {
        if (err instanceof NotFoundError) {
          console.log(err)
        }
      }
    })

    // this.lessonsService.getAllLessonsElements().subscribe({
    //   next: response => {
    //     this.lessonElements = response;
    //     // console.log(response)
    //   }
    //   , error: (err: AppError) => {
    //     if (err instanceof NotFoundError) {
    //       console.log(err)
    //     }
    //   }
    // });
  }

  filterLessons(lessons : Lesson[],category : string) {
    return lessons.filter(lesson => lesson.category == category);
  }

  toggle() {
    console.log('isExpanded: ');
    console.log(this.isExpanded);
    this.isExpanded = !this.isExpanded;
  }

}

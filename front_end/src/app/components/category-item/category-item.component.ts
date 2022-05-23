import { LoaderService } from './../../services/loader.service';
import { AuthService } from './../../services/auth.service';
import { ProgressService } from './../../services/progress.service';
import { Router } from '@angular/router';

import { Component, Input, OnInit } from '@angular/core';
import { Lesson } from 'src/app/interfaces/Lesson';
import { LessonElement } from 'src/app/interfaces/LessonElement';
import { LessonsService } from 'src/app/services/lessons.service';
import { CourseService } from 'src/app/services/course.service';
import { AppError } from 'src/app/exceptions/AppError';
import { NotFoundError } from 'rxjs';
import { Progress } from 'src/app/interfaces/Progress';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.css']
})
export class CategoryItemComponent implements OnInit {
  // @Input('category') category !:string;
  @Input('lessonElements') lessonElements !:LessonElement[];
  // @Input('lessonProgress') lessonProgress !:number;
  lessonProgress !:string;
  @Input('progress') progress !:Progress;
  
  
  value : number = 0;
  words!: LessonElement[];
  // words = ['Hi', 'Hello', 'What', 'Mean', 'This', 'Know', 'No', 'Now', 'Not', 'Me'];

  @Input('lesson') lesson !: Lesson;
  // progress: string = '0';

  
  constructor(private lessonsService : LessonsService,
              private router: Router,
              private courseService: CourseService,
              private progressService : ProgressService,
              private authService : AuthService,
              private loaderService : LoaderService
              ) {this.loaderService.hideLoader(); }

  ngOnInit(): void {
    console.log(this.progress)
    

    
    // this.progress = this.lessonProgress.toString()

    // this.progressService.getCurrentProgess(this.authService.getRoleId(),this.lesson.id.toString() || '0').subscribe({
    //   next: response => {
    //     this.lessonProgress = response;
    //     console.log(response)
    //   }
    //   , error: (err: AppError) => {
    //     if (err instanceof NotFoundError) {
    //       console.log(err)
    //     }
    //   }
    // })
    
    // this.lessonsService.getLessons().subscribe(result => this.lessons = result)
    // this.lessonsService.getLessonElements(this.lesson.id || 0).subscribe({
    //   next: response => {
    //     this.words = response;
    //     console.log(response)
    //   }
    //   , error: (err: AppError) => {
    //     if (err instanceof NotFoundError) {
    //       console.log(err)
    //     }
    //   }
    // })
    
  }

  completed(element : LessonElement) {
    (this.progress.progression)  || 0 >= (element.id || 0)
  }

  viewWord(element: LessonElement) {
    console.log(this.lesson)
    console.log(element)
    // this.courseService.setWord(word);
    this.router.navigate(['/level/'+this.lesson.id+'/'+element.id]);
  }

}

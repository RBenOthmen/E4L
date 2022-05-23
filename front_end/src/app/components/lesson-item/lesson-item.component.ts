import { LoaderService } from './../../services/loader.service';
import { AuthService } from 'src/app/services/auth.service';
import { ProgressService } from './../../services/progress.service';
import { LessonsService } from 'src/app/services/lessons.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Lesson } from 'src/app/interfaces/Lesson';
import { AppError } from 'src/app/exceptions/AppError';
import { NotFoundError } from 'rxjs';
import { LessonElement } from 'src/app/interfaces/LessonElement';
import { Progress } from 'src/app/interfaces/Progress';

@Component({
  selector: 'app-lesson-item',
  templateUrl: './lesson-item.component.html',
  styleUrls: ['./lesson-item.component.css'],
})
export class LessonItemComponent implements OnInit {
  isExpanded!: boolean;
  @Input('lesson') lesson!: Lesson;
  @Input('lessonElements') lessonElements!: LessonElement[];
  @Input('lessonProgress') lessonProgress: number = 0;
  progress !:Progress;
  
  // lessons!: Lesson[]
  // lessonProgress : number = 0;
  // lessonElements !: LessonElement[];

  // @Input('category') category !: string;
  
  constructor(private router: Router, private lessonsService :LessonsService,
    private progressService : ProgressService,
    private authService : AuthService,
    ) {}

  ngOnInit(): void {
    
    let lessonid = this.lesson.id
    console.log(lessonid)
    this.progressService.getCurrentProgess(this.authService.getRoleId(), lessonid?.toString() || '0').subscribe({
      next: response => {
        this.progress = response;
        console.log(response)

      }
      , error: (err: AppError) => {
        this.progress = {progression : 0};
        if (err instanceof NotFoundError) {
          console.log(err)
        }
      }
    })

    // this.lessonsService.getLessonsByCategory(this.category).subscribe({
    //   next: response => {
    //     this.lessons = response;
    //     console.log(response)
    //   }
    //   , error: (err: AppError) => {
    //     if (err instanceof NotFoundError) {
    //       console.log(err)
    //     }
    //   }
    // })

    // this.progressService.getLessonProgress(this.authService.getRoleId(),this.lesson.id || 0).subscribe({
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

    

    // this.lessonsService.getLessonElements(this.lesson.id || 0).subscribe({
    //   next: response => {
    //     this.lessonElements = response;
    //     console.log(response)
    //   }
    //   , error: (err: AppError) => {
    //     if (err instanceof NotFoundError) {
    //       console.log(err)
    //     }
    //   }
    // })
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  // goToLevel() {
  //   console.log('goToLevel() clicked');
  //   this.router.navigate(['level/'+this.lesson.id]);
  // }

  
}

import { AuthService } from 'src/app/services/auth.service';
import { ProgressService } from './../../services/progress.service';
import { LessonsService } from 'src/app/services/lessons.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Lesson } from 'src/app/interfaces/Lesson';
import { AppError } from 'src/app/exceptions/AppError';
import { NotFoundError } from 'rxjs';

@Component({
  selector: 'app-lesson-item',
  templateUrl: './lesson-item.component.html',
  styleUrls: ['./lesson-item.component.css'],
})
export class LessonItemComponent implements OnInit {
  isExpanded!: boolean;
  @Input('lesson') lesson!: Lesson;
  // lessons!: Lesson[]
  lessonProgress : number = 0;

  // @Input('category') category !: string;
  
  constructor(private router: Router, private lessonsService :LessonsService,
    private progressService : ProgressService,
    private authService : AuthService) {}

  ngOnInit(): void {
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

    this.progressService.getLessonProgress(this.authService.getRoleId(),this.lesson.id || 0).subscribe({
      next: response => {
        this.lessonProgress = response;
        console.log(response)
      }
      , error: (err: AppError) => {
        if (err instanceof NotFoundError) {
          console.log(err)
        }
      }
    })
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  // goToLevel() {
  //   console.log('goToLevel() clicked');
  //   this.router.navigate(['level/'+this.lesson.id]);
  // }
}

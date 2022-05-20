import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotFoundError } from 'rxjs';
import { AppError } from 'src/app/exceptions/AppError';
import { Lesson } from 'src/app/interfaces/Lesson';
import { AuthService } from 'src/app/services/auth.service';
import { LessonsService } from 'src/app/services/lessons.service';
import { ProgressService } from 'src/app/services/progress.service';

@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.css']
})
export class LessonListComponent implements OnInit {

  lessons!: Lesson[]
  categoryProgress : number = 0;
  @Input('category') category !: string;
  
  constructor(private router: Router, private lessonsService :LessonsService,
    private authService :AuthService,
    private progressService : ProgressService) { }

  ngOnInit(): void {
    this.lessonsService.getLessonsByCategory(this.category).subscribe({
      next: response => {
        this.lessons = response;
        console.log(response)
      }
      , error: (err: AppError) => {
        if (err instanceof NotFoundError) {
          console.log(err)
        }
      }
    });

    this.progressService.getCategoryProgress(this.authService.getRoleId(),this.category).subscribe({
      next: response => {
        this.categoryProgress = response;
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

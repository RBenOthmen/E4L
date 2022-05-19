import { Router } from '@angular/router';

import { Component, Input, OnInit } from '@angular/core';
import { Lesson } from 'src/app/interfaces/Lesson';
import { LessonElement } from 'src/app/interfaces/LessonElement';
import { LessonsService } from 'src/app/services/lessons.service';
import { CourseService } from 'src/app/services/course.service';
import { AppError } from 'src/app/exceptions/AppError';
import { NotFoundError } from 'rxjs';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.css']
})
export class CategoryItemComponent implements OnInit {
  // @Input('category') category !:string;
  value : number = 0;
  words!: LessonElement[];
  // words = ['Hi', 'Hello', 'What', 'Mean', 'This', 'Know', 'No', 'Now', 'Not', 'Me'];

  @Input('lesson') lesson !: Lesson;


  constructor(private lessonsService : LessonsService,
              private router: Router,
              private courseService: CourseService
              ) { }

  ngOnInit(): void {
    
    // this.lessonsService.getLessons().subscribe(result => this.lessons = result)
    this.lessonsService.getLessonElements(this.lesson.id || 0).subscribe({
      next: response => {
        this.words = response;
        console.log(response)
      }
      , error: (err: AppError) => {
        if (err instanceof NotFoundError) {
          console.log(err)
        }
      }
    })
    
  }

  viewWord(element: LessonElement) {
    // this.courseService.setWord(word);
    this.router.navigate(['/level/'+this.lesson.id+'/'+element.id]);
  }

}

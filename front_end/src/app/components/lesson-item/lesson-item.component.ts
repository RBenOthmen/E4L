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

  // @Input('category') category !: string;
  
  constructor(private router: Router, private lessonsService :LessonsService) {}

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
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  // goToLevel() {
  //   console.log('goToLevel() clicked');
  //   this.router.navigate(['level/'+this.lesson.id]);
  // }
}

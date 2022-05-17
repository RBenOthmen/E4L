import { Router } from '@angular/router';

import { Component, Input, OnInit } from '@angular/core';
import { Lesson } from 'src/app/interfaces/Lesson';
import { LessonsService } from 'src/app/services/lessons.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.css']
})
export class CategoryItemComponent implements OnInit {
  lessons!: Lesson[];
  // @Input('category') category !:string;
  value : number = 0;
  // words!: string[];
  words = ['Hi', 'Hello', 'What', 'Mean', 'This', 'Know', 'No', 'Now', 'Not', 'Me'];


  constructor(private lessonsService : LessonsService,
              private router: Router,
              private courseService: CourseService
              ) { }

  ngOnInit(): void {
    this.lessonsService.getLessons().subscribe(result => this.lessons = result)
  }

  viewWord(word: string) {
    this.courseService.setWord(word);
    this.router.navigate(['level']);
  }

}

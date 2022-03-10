
import { Component, Input, OnInit } from '@angular/core';
import { Lesson } from 'src/app/interfaces/Lesson';
import { LessonsService } from 'src/app/services/lessons.service';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.css']
})
export class CategoryItemComponent implements OnInit {
  lessons!: Lesson[];
  @Input('category') category !:string;
  value : number = 0;

  constructor(private lessonsService : LessonsService) { }

  ngOnInit(): void {
    this.lessonsService.getLessons().subscribe(result => this.lessons = result)
  }

}

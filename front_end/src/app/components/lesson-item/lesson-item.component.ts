import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Lesson } from 'src/app/interfaces/Lesson';

@Component({
  selector: 'app-lesson-item',
  templateUrl: './lesson-item.component.html',
  styleUrls: ['./lesson-item.component.css'],
})
export class LessonItemComponent implements OnInit {
  isExpanded!: boolean;
  @Input('lesson') lesson!: Lesson;
  
  constructor(private router: Router) {}

  ngOnInit(): void {}

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  goToLevel() {
    console.log('goToLevel() clicked');
    this.router.navigate(['level']);
  }
}

import { CourseService } from 'src/app/services/course.service';
import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { Lesson } from 'src/app/interfaces/Lesson';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css'],
})
export class LevelComponent implements OnInit {
  isExpanded!: boolean;
  @Input('lesson') lesson!: Lesson;
  progress = 20;
  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';
  bufferValue = 75;
  word = 'word 3';
  microState = false;
  level = 'Level 1';

  constructor(private router: Router, private courseService: CourseService) {}

  ngOnInit(): void {
    console.log(this.word);
    this.word = this.courseService.getWord();
    console.log(this.word);
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  toggleMicroState() {
    this.microState = !this.microState;
  }

  submitAnswer() {
    console.log('submitAnswer() clicked');
    // this.router.navigate(['']);
  }
}

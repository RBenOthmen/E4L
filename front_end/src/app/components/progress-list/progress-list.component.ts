import { LoaderService } from './../../services/loader.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotFoundError } from 'rxjs';
import { AppError } from 'src/app/exceptions/AppError';
import { Lesson } from 'src/app/interfaces/Lesson';
import { ProgressPercentage } from 'src/app/interfaces/ProgressPercentage';
import { AuthService } from 'src/app/services/auth.service';
import { LessonsService } from 'src/app/services/lessons.service';
import { ProgressService } from 'src/app/services/progress.service';

@Component({
  selector: 'app-progress-list',
  templateUrl: './progress-list.component.html',
  styleUrls: ['./progress-list.component.css']
})
export class ProgressListComponent implements OnInit {
@Input('categories') categories !: string[];
  // @Input('category') category !: string;
  @Input('lessons') lessons !: Lesson[];
  lessonsProgress !: ProgressPercentage[];

  constructor(private router: Router, private lessonsService :LessonsService,
    private authService :AuthService,
    private progressService : ProgressService,
    private loaderService : LoaderService) { }


  ngOnInit(): void {
    // this.loaderService.hideLoader()
    this.progressService.getAllLessonsProgress(this.authService.getRoleId()).subscribe({
      next: response => {
        this.lessonsProgress = response;
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

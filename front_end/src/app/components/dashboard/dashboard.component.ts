import { ProgressService } from './../../services/progress.service';
import { AuthService } from 'src/app/services/auth.service';
import { Lesson } from 'src/app/interfaces/Lesson';
import { Component, Input, OnInit } from '@angular/core';
import { AppError } from 'src/app/exceptions/AppError';
import { NotFoundError } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  categories = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  isExpanded !: boolean;
  @Input('lesson') lesson !:Lesson;
  categoryProgress : number = 0;
  constructor(private authService :AuthService,
    private progressService : ProgressService) { }

  ngOnInit(): void {
  }

  toggle() {
    console.log('isExpanded: ');
    console.log(this.isExpanded);
    this.isExpanded = !this.isExpanded;
  }

}

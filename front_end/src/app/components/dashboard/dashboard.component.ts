import { Lesson } from 'src/app/interfaces/Lesson';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  categories = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  isExpanded !: boolean;
  @Input('lesson') lesson :Lesson={title:'Title 1'};

  constructor() { }

  ngOnInit(): void {
  }

  toggle() {
    console.log('isExpanded: ');
    console.log(this.isExpanded);
    this.isExpanded = !this.isExpanded;
  }

}

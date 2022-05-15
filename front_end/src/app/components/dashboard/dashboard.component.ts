import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  categories = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  constructor() { }

  ngOnInit(): void {
  }

}

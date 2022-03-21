import { Teacher } from './../../interfaces/Teacher';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {
  @Input('teacher') teacher !:Teacher;
  constructor() { }

  ngOnInit(): void {
  }

}

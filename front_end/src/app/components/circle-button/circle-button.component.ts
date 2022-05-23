import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-circle-button',
  templateUrl: './circle-button.component.html',
  styleUrls: ['./circle-button.component.css']
})
export class CircleButtonComponent implements OnInit {

  @Input('value') value !:string;
  @Input('color') color !:string;

  constructor() { }

  ngOnInit(): void {
  }

}

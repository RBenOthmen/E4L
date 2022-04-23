import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-meet-user-item',
  templateUrl: './meet-user-item.component.html',
  styleUrls: ['./meet-user-item.component.css']
})
export class MeetUserItemComponent implements OnInit {

  

  @Output('onChoiceUser') onChoiceUser: EventEmitter<User> = new EventEmitter();
  @Input('user') user !:User;

  constructor() { }

  ngOnInit(): void {
    
  }

  onclick() {
    this.onChoiceUser.emit(this.user);
  }

}

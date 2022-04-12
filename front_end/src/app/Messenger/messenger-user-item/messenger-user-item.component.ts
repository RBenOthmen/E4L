import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-messenger-user-item',
  templateUrl: './messenger-user-item.component.html',
  styleUrls: ['./messenger-user-item.component.css']
})
export class MessengerUserItemComponent implements OnInit {
  @Output('onMessage') onMessage: EventEmitter<User> = new EventEmitter();
  @Input('user') user !:User;

  constructor() { }

  ngOnInit(): void {
  }

  onMessageUser() {
    this.onMessage.emit(this.user);
  }

}


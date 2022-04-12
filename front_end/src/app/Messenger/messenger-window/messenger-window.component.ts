import { AuthService } from 'src/app/services/auth.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChatService, Message } from 'src/app/services/chat.service';

@Component({
  selector: 'app-messenger-window',
  templateUrl: './messenger-window.component.html',
  styleUrls: ['./messenger-window.component.css']
})
export class MessengerWindowComponent implements OnInit {
  @Output('goToChatList') goToChatList: EventEmitter<string> = new EventEmitter();
  // messages : Message[] = [];
  @Input('messages') messages !:Message[];
  @Input('currentUserId') currentUserId !:number;

  constructor(private chatService: ChatService,private authService : AuthService) { 
    
    
  }

  ngOnInit(): void {
  }

  sendMsg(data : string) {
    let message : Message = {
      message: '',
    };
    message.message = data;
    
    this.chatService.messages.next(message);
    // message.type ='sent'
    this.messages.push(message);
  }

  exit() {
    this.goToChatList.emit();
  }

}

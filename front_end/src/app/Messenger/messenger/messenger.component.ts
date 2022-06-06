import { StudentService } from './../../services/student.service';
import { AuthService } from 'src/app/services/auth.service';

import { TeacherService } from './../../services/teacher.service';
import { Component, OnInit } from '@angular/core';
import { ChatService, Message } from 'src/app/services/chat.service';
import { User } from 'src/app/interfaces/user';
import { AppError } from 'src/app/exceptions/AppError';
import { NotFoundError } from 'src/app/exceptions/not-found-error';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css']
})
export class MessengerComponent implements OnInit {
  receiver !:User;
  messages : Message[] = [];
  users !: User[];
  showScreen : string = 'chatlist'
  currentUser : User = {}
  
  constructor(private chatService: ChatService, private teacherService : TeacherService,
    public authService :AuthService,
    private studentService:StudentService,
    private loaderService : LoaderService) {
      loaderService.hideLoader()
      chatService.messages.subscribe(msg => {
          this.messages.push(msg);
          console.log('messages')
          console.log(this.messages)
          
          console.log("Response from websocket: " + msg);
    });
  }
  
  ngOnInit(): void {
  
   
    this.getListUsers();
    

  }

  getListUsers() {
    if (this.authService.getRole() =="S") {
    
      this.teacherService.getTeachers().subscribe({
       next: result => this.users = result
       ,error : (err : AppError) => {
         if (err instanceof NotFoundError){
          console.log(err)
         }
       }
     });
    } else if (this.authService.getRole() =="T") {
      this.studentService.getStudents().subscribe({
        next: result => this.users = result
        ,error : (err : AppError) => {
          if (err instanceof NotFoundError){
           console.log(err)
          }
        }
      });
    }
  }

  onMessageUser(user : User) {
    
    // let roomName : string ='';
    // if (this.currentUser.role =="S") {
    //   roomName = <string>this.currentUser.username + user.username
    //   console.log(roomName)
    // } else if (this.currentUser.role =="T") {
    //   roomName = user.username + <string>this.currentUser.username
    // }
    // console.log(roomName)
    // this.chatService.setChatUrl(roomName);
    this.receiver = user;
    console
    this.chatService.getAllMessages(this.authService.getId(),<number>this.receiver.user?.id)
      .subscribe({
        next: result => {
          this.messages = result;
          console.log(result)
         }
         ,error : (err : AppError) => {
           if (err instanceof NotFoundError){
             console.log(err)
           }
         }
       });
    
    if (this.showScreen == 'chatlist')
      this.showScreen = 'chat'

      
    
  }

  goToChatList() {
    if (this.showScreen == 'chat')
      this.showScreen = 'chatlist'
  }

  sendMsg(data : string) {
    let message : Message = {
      message: data,
      sender : this.currentUser.id,
      receiver : this.receiver.user?.id,
    };
    
    this.chatService.messages.next(message);

    this.chatService.storeMessageDB(message).subscribe(
      res => console.log('stored')
    );

    
    // message.type ='sent'
    // this.messages.push(message);
  }
}




  

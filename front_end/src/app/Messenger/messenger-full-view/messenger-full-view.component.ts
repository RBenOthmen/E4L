import { Component, OnInit } from '@angular/core';
import { NotFoundError } from 'rxjs';
import { AppError } from 'src/app/exceptions/AppError';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService, Message } from 'src/app/services/chat.service';
import { StudentService } from 'src/app/services/student.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-messenger-full-view',
  templateUrl: './messenger-full-view.component.html',
  styleUrls: ['./messenger-full-view.component.css']
})
export class MessengerFullViewComponent implements OnInit {
  users !: User[];
  receiver !:User;
  messages : Message[] = [];
  constructor(private chatService: ChatService, private teacherService : TeacherService,
    public authService :AuthService,
    private studentService:StudentService) { 
      chatService.messages.subscribe(msg => {
        this.messages.push(msg);
        console.log('messages')
        console.log(this.messages)
        
        console.log("Response from websocket: " + msg);
  });
     }

  ngOnInit(): void {
    this.getListUsers()
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
    
    this.receiver = user;

    this.chatService.getAllMessages(this.authService.getId(),<number>this.receiver.id)
      .subscribe({
        next: result => {
          this.messages = result;
         }
         ,error : (err : AppError) => {
           if (err instanceof NotFoundError){
             console.log(err)
           }
         }
       });
    
    // if (this.showScreen == 'chatlist')
    //   this.showScreen = 'chat'

  }

  sendMsg(data : string) {
    let message : Message = {
      message: data,
      sender : this.authService.getId(),
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

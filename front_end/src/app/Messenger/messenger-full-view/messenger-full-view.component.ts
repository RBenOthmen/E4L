import { LoaderService } from './../../services/loader.service';
import { UserService } from 'src/app/services/user.service';
import { AdminService } from './../../services/admin.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
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
  @Input('receiver') receiver!: User;
  // receiver !:User;
  messages : Message[] = [];
  constructor(private route : ActivatedRoute,private userService : UserService,private chatService: ChatService, private teacherService : TeacherService,
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
    this.getListUsers()
    let receiverid : string = '';
    this.route.paramMap.subscribe((params: ParamMap) => {
      receiverid = <string>params.get('receiverid')
    });

    if (receiverid != '') {
      this.getReceiver(receiverid);
    }
  }

  getReceiver(receiverid : string) {
    this.teacherService.getTeacher(receiverid).subscribe({
      next: result => {
        this.receiver = result
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
      }
      ,error : (err : AppError) => {
        if (err instanceof NotFoundError){
         console.log(err)
        }
      }
    });
          
         
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

  getDate(message : Message) {
    let date = message.sent_date || new Date();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    return hour+'-'+minutes+'-'+seconds;
  }

  onMessageUser(user : User) {
    
    this.receiver = user;
    console.log(this.authService.getId())
    console.log(<number>this.receiver.id)
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

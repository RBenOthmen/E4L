import { ZoomService } from './../../Zoom/zoom.service';
import { ZoomMeeting } from './../../interfaces/ZoomMeeting';
import { Component, OnInit, Inject, ChangeDetectionStrategy, Input, Output } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Meeting } from 'src/app/interfaces/Meeting';
import { User } from 'src/app/interfaces/user';
import { MeetingService } from 'src/app/services/meeting.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { AuthService } from 'src/app/services/auth.service';
import { StudentService } from 'src/app/services/student.service';
import { NotFoundError } from 'src/app/exceptions/not-found-error';
import { AppError } from 'src/app/exceptions/AppError';
import { CalendarEvent } from '../calendar/calendar'
import { BadInput } from 'src/app/exceptions/BadInput';

@Component({
  selector: 'app-organize-meeting',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './organize-meeting.component.html',
  styleUrls: ['./organize-meeting.component.css']
})
export class OrganizeMeetingComponent implements OnInit {

  users !: User[];

  event !: CalendarEvent;

  currentUser !: User;

  uploading : boolean = false;

  constructor(private modal: NgbModal,
    @Inject(MAT_DIALOG_DATA) public data : any,
    private dialogRef : MatDialogRef<OrganizeMeetingComponent>,
    private meetingService : MeetingService,
    private teacherService : TeacherService,
    public authService :AuthService,
    private studentService:StudentService,
    private zoomService : ZoomService) {
    // this.users = data;
    // this.getUserDetails();
    this.users = data.users;
    this.event = data.event;
    this.currentUser = data.currentUser;
   }

  ngOnInit(): void {
  }

  onChoiceUser(user : User) {
    if (this.event.title == '') {
      this.createMeeting(this.event, user)
    } else {
      this.updateMeeting(this.event, user)
    }

  }

  

  createMeeting(meeting : CalendarEvent, user : User) {
      this.uploading = true;
      console.log(this.currentUser.email)
      this.zoomService.createMeeting(<string>this.currentUser.email).subscribe({
        next : (data : ZoomMeeting) => {
           if(data) {
          console.log(data)
          let join_URL : string =  <string>data.join_URL
          // let meetingNumber : string = data.join_URL?.slice(0, data.join_URL.indexOf('?')) || '0'
          // meetingNumber = meetingNumber.substring(join_URL.indexOf('j/')+2, meetingNumber.length)
          // console.log(meetingNumber);
          let meetingNumber = <string>data.meetingNumber
          let password : string = <string>data.meetingPassword;
          console.log()
          // this.getSignature(1,meetingNumber, password);
          this.createDbMeeting(meeting,user,meetingNumber,password,join_URL)
        } else {
          console.log(data)
        }
        },
          error : (err : AppError) => {
           console.log(err)
         }
        })
      
  }

  createDbMeeting(meeting : CalendarEvent, user : User, meetingNumber : string, password : string,join_URL:string) {
    meeting.recipient_id = user.user_id;
    meeting.title = user.user?.username || '';
    meeting.meetingNumber = meetingNumber;
    meeting.password = password;
    meeting.join_URL = join_URL;
    // meeting.username_recipient
    console.log(meeting)
  this.meetingService.createMeeting(meeting).subscribe({
    next: result => {
      console.log(result)
      this.uploading = false;
      this.dialogRef.close();
     }
     ,error : (err : AppError) => {
       if (err instanceof BadInput){
         console.log(err)
       }
     }
   });
  }

  updateMeeting(meeting : CalendarEvent, user : User) {
    this.uploading = true;

    if (this.authService.getId() == this.event.organizer_id) {
      meeting.recipient_id = user.user_id;
      meeting.title = user.user?.username || '';
    } else if (this.authService.getId() == this.event.recipient_id) {
      meeting.recipient_id = meeting.organizer_id;
      meeting.organizer_id = user.user_id;
      meeting.title = user.user?.username || '';
    }



    meeting.status = 'P';

    this.meetingService.updateMeeting(meeting,this.authService.getId() || 0).subscribe({
      next: result => {
        console.log(result)
        this.uploading = false;
        this.dialogRef.close();
       }
       ,error : (err : AppError) => {
         if (err instanceof BadInput){
           console.log(err)
         }
       }
     });
  }

  


}

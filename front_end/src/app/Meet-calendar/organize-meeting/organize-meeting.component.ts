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

  constructor(private modal: NgbModal,
    @Inject(MAT_DIALOG_DATA) public data : any,
    private dialogRef : MatDialogRef<OrganizeMeetingComponent>,
    private meetingService : MeetingService,
    private teacherService : TeacherService,
    private authService :AuthService,
    private studentService:StudentService) {
    // this.users = data;
    // this.getUserDetails();
    this.users = this.data.users;
    this.event = data.event;
   }

  ngOnInit(): void {
    console.log(this.users)
  }

  onChoiceUser(user : User) {
    console.log(this.event.title == '')
    if (this.event.title == '') {
      this.createMeeting(this.event, user)
    } else {
      this.updateMeeting(this.event, user)
    }

  }

  createMeeting(meeting : CalendarEvent, user : User) {
    if (meeting.professeur_id) {
      meeting.eleve_id = user.id;
      meeting.title = user.user?.username || '';
    } else if (meeting.eleve_id) {
      meeting.professeur_id = user.id;
      meeting.title = user.user?.username || '';
    }

    

    this.meetingService.CreateStudentMeeting(meeting,this.authService.currentUser.user_id || 0).subscribe({
      next: result => {
        console.log(result)
       }
       ,error : (err : AppError) => {
         if (err instanceof BadInput){
           console.log(err)
         }
       }
     });
  }

  updateMeeting(meeting : CalendarEvent, user : User) {
    if (user.id == this.event.professeur_id) {
      meeting.professeur_id = user.id;
      meeting.title = user.user?.username || '';
    } else if (user.id == this.event.eleve_id) {
      meeting.eleve_id = user.id;
      meeting.title = user.user?.username || '';
    }

    console.log(user.id == this.event.professeur_id)

    console.log(user.id + ' ' + this.event.professeur_id)

    console.log(user.id == this.event.eleve_id)

    console.log(user.id + ' ' + this.event.eleve_id)

    console.log(meeting)

    this.meetingService.updateStudentMeeting(meeting,this.authService.currentUser.user_id || 0).subscribe({
      next: result => {
        console.log(result)
       }
       ,error : (err : AppError) => {
         if (err instanceof BadInput){
           console.log(err)
         }
       }
     });
  }

  


}
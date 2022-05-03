
import { OrganizeMeetingComponent } from '../organize-meeting/organize-meeting.component';
import { OnInit } from '@angular/core';

import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
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
import {
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { Meeting } from 'src/app/interfaces/Meeting';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

const colors: any = {
  // red: {
  //   primary: '#ad2121',
  //   secondary: '#FAE3E3',
  // },
  // blue: {
  //   primary: '#1e90ff',
  //   secondary: '#D1E8FF',
  // },
  // yellow: {
  //   primary: '#e3bc08',
  //   secondary: '#FDF1BA',
  // },
  red : '#ad2121',
  blue : '#1e90ff',
  yellow : '#e3bc08'
};

import { CalendarEvent } from './calendar'
import { MeetingService } from 'src/app/services/meeting.service';
import { User } from 'src/app/interfaces/user';
import { TeacherService } from 'src/app/services/teacher.service';
import { AuthService } from 'src/app/services/auth.service';
import { StudentService } from 'src/app/services/student.service';
import { AppError } from 'src/app/exceptions/AppError';
import { NotFoundError } from 'src/app/exceptions/not-found-error';
import { BadInput } from 'src/app/exceptions/BadInput';


@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

  users!: User[];

  currentUser !: User;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData!: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh = new Subject<void>();

  events: CalendarEvent[] = []

  activeDayIsOpen: boolean = true;



  constructor(private modal: NgbModal,
    private dialog: MatDialog,
    private meetingService : MeetingService,
    private teacherService : TeacherService,
    public authService :AuthService,
    private studentService:StudentService) {}

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  ngOnInit(): void {
    this.getMeetings();
    this.getUserDetails();
    
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }
  
  
  setView(view: CalendarView) {
    this.view = view;
  }
  
  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  getMeetings() {

    this.meetingService.getMeeting(this.authService.getId())
    .subscribe({
      next: result => {
        console.log('get meetings')
        for (let res of result) {
          res.start = new Date(res.start)
          if (res.organizer_id != this.authService.getId()) {
            res.title = <string>res.username_organizer;
          }
        }
        console.log(result)
        this.events = result;
        this.refresh.next()
       }
       ,error : (err : AppError) => {
         if (err instanceof NotFoundError){
           console.log(err)
         }
       }
     });

  }

  
  deleteEvent(eventToDelete: CalendarEvent) {
    if (eventToDelete.title =='')
      this.events = this.events.filter((event) => event !== eventToDelete);
      else {
        this.meetingService.deleteMeeting(eventToDelete, this.authService.getId() || 0)
    .subscribe({
      next: result => {
        this.events = this.events.filter((event) => event !== eventToDelete);
        this.refresh.next()
       }
       ,error : (err : AppError) => {
         if (err instanceof NotFoundError){
           console.log(err)
         }
       }
      });
      // if (this.authService.currentUser.role =="T") {
      //   this.deleteTeacherMeeting(eventToDelete);
      // } else if (this.authService.currentUser.role =="S") {
        //   this.deleteStudentMeeting(eventToDelete);
        // }
      }
    }
    
    
    
    updateMeeting(meeting: CalendarEvent) {
      if (meeting.title == '')
      this.refresh.next()
      else {
        
        this.meetingService.updateMeeting(meeting, this.authService.getId() || 0).subscribe({
          next: result => {
            this.refresh.next()
        }
        ,error : (err : AppError) => {
          if (err instanceof NotFoundError){
            console.log(err)
          }
        }
      });
      // if (this.authService.currentUser.role =="S") {
        //   this.updateStudent(meeting)
        // } else if (this.authService.currentUser.role =="T") {
      //   this.updateTeacher(meeting)
      // }
    }
    
  }
  
  
  addMeeting(): void {
    let meeting : CalendarEvent= {
      title : '',
      start: startOfDay(new Date()),
      color: colors.red,
      status : 'P',
      organizer_id : this.authService.getId(),
      username_organizer : this.authService.currentUser.username,
    }
    // if (this.authService.currentUser.role =="T") {
      //   meeting.professeur_id = this.authService.currentUser.user_id
      // } else if (this.authService.currentUser.role =="S") {
        //   meeting.eleve_id = this.authService.currentUser.user_id
        // }

        this.events = [
          ...this.events,
      meeting
    ];
    
  }

  acceptMeeting(meeting: CalendarEvent) {
    meeting.status = 'A';
    this.meetingService.updateMeeting(meeting,this.authService.getId() || 0).subscribe({
      next: result => {
       }
       ,error : (err : AppError) => {
         if (err instanceof BadInput){
           console.log(err)
         }
       }
     });
  }

  refuseMeeting(meeting: CalendarEvent) {
    meeting.status = 'R';
    this.meetingService.updateMeeting(meeting,this.authService.getId() || 0).subscribe({
      next: result => {
       }
       ,error : (err : AppError) => {
         if (err instanceof BadInput){
           console.log(err)
         }
       }
     });
  }
  
  getUserId() {
    this.authService.getUserId(this.authService.getId()).subscribe({
      next: result => {
        this.currentUser = result
        this.getMeetings();
        
      }
      ,error : (err : AppError) => {
        if (err instanceof NotFoundError){
          console.log(err)
         }
        }
      });
    }
    
    
    getUserDetails() {
      this.authService.getUserDetails().subscribe({
        next: result => {
          this.currentUser = result
          // this.authService.getUserId(result.id).subscribe()
          this.getListUsers();
        // this.getUserId();
        
      }
       ,error : (err : AppError) => {
         if (err instanceof NotFoundError){
           console.log(err)
          }
        }
      });
    }
    
    getListUsers() {
      
      if (this.authService.currentUser.role =="S") {
        this.teacherService.getTeachers().subscribe({
          next: result => {
            
            this.users = result
          }
          ,error : (err : AppError) => {
            if (err instanceof NotFoundError){
              console.log(err)
        }
      }
    });
  } else if (this.authService.currentUser.role =="T") {
    this.studentService.getStudents().subscribe({
      next: result => {
        this.users = result
      }
      ,error : (err : AppError) => {
        if (err instanceof NotFoundError){
          console.log(err)
        }
      }
    });
  }
  
  
    
  }
  
  selectUser(user : CalendarEvent) {
    if (!this.users)
    this.getUserDetails();
    this.dialog.open(OrganizeMeetingComponent, {
      width : '30%',
      data : {
        users : this.users,
        event : user
      }
      
    }).afterClosed().subscribe(
      () => {
        this.getMeetings();
        this.refresh.next()
      }
      );;
    }
    
    
    // deleteTeacherMeeting(eventToDelete: CalendarEvent) {
    //   this.meetingService.deleteTeacherMeeting(eventToDelete, this.authService.currentUser.id || 0)
    //   .subscribe({
    //     next: result => {
    //       this.events = this.events.filter((event) => event !== eventToDelete);
    //       this.refresh.next()
    //     }
    //     ,error : (err : AppError) => {
    //       if (err instanceof NotFoundError){
    //         console.log(err)
    //        }
    //      }
    //     });
    //   }
      
    //   deleteStudentMeeting(eventToDelete: CalendarEvent) {
    //     this.meetingService.deleteStudentMeeting(eventToDelete, this.authService.currentUser.user_id || 0)
    //     .subscribe({
    //       next: result => {
    //         this.events = this.events.filter((event) => event !== eventToDelete);
    //         this.refresh.next()
    //       }
    //       ,error : (err : AppError) => {
    //         if (err instanceof NotFoundError){
    //           console.log(err)
    //         }
    //       }
    //     });
    //   }
      
    //   updateStudent(meeting : CalendarEvent) {
    //     this.meetingService.updateStudentMeeting(meeting, this.authService.currentUser.user_id || 0).subscribe({
    //       next: result => {
    //       this.refresh.next()
    //      }
    //      ,error : (err : AppError) => {
    //        if (err instanceof NotFoundError){
    //          console.log(err)
    //        }
    //       }
    //     });
    //   }
      
    //   updateTeacher(meeting : CalendarEvent) {
    //     this.meetingService.updateTeacherMeeting(meeting, this.authService.currentUser.user_id || 0).subscribe({
    //     next: result => {
    //       this.refresh.next()
    //     }
    //     ,error : (err : AppError) => {
    //       if (err instanceof NotFoundError){
    //         console.log(err)
    //       }
    //     }
    //   });
    // }

    // getTeacherMeetings() {
      
    //   this.meetingService.getTeacherMeetings(this.authService.currentUser.id || 0)
    //   .subscribe({
    //     next: result => {
    //       // this.events = result;
    //       this.events = [
    //         ...this.events,
    //         ...result
    //       ];
    //       this.refresh.next()
    //      }
    //      ,error : (err : AppError) => {
    //        if (err instanceof NotFoundError){
    //          console.log(err)
    //        }
    //      }
    //    });
    // }
  
    // getStudentMeetings() {
    //   this.meetingService.getStudentMeetings(this.authService.currentUser.user_id || 0)
    //   .subscribe({
    //     next: result => {
    //       // this.events = result;
    //       for (let res of result) {
    //         res.start = new Date(res.start)
    //       }
    //       this.events = result
    //       this.refresh.next()
    //       console.log(result)
    //      }
    //      ,error : (err : AppError) => {
    //        if (err instanceof NotFoundError){
    //          console.log(err)
    //        }
    //      }
    //    });
    // }
  }
  
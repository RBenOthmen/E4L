import { NotFoundError } from './../../exceptions/not-found-error';
import { MeetingService } from './../../services/meeting.service';
import { ZoomMeeting } from './../../interfaces/ZoomMeeting';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Meeting } from 'src/app/interfaces/Meeting';
import { AppError } from 'src/app/exceptions/AppError';


@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {

  meetings !: ZoomMeeting[];
  activeMeeting !:ZoomMeeting;
  role : string = '0';
  url : string = '';
  private destroy = new Subject()

  constructor(private route : ActivatedRoute,
    private router : Router,
    private meetingService : MeetingService) { }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy)).subscribe(
      ({ meeting }) => this.validateMeeting(meeting)
    );
    this.role = this.route.snapshot.paramMap.get('role') || '0';
  }

  ngOnDestroy() {
    this.destroy.next(0);
    this.destroy.complete();
  }

  private validateMeeting(meetingId: number) {
    // const meeting = this.meetings.find(meeting => meeting.name === meetingName);
    let meeting : ZoomMeeting = {};
    this.meetingService.getMeeting(meetingId).subscribe({
      next: result => {
        console.log(result)
        meeting.meetingNumber = result.meetingNumber;
        meeting.meetingPassword = result.password;
        console.log(!!result)
        if (result) {
          this.setMeetingUrl(meeting)
        } else {
          this.router.navigateByUrl('/home');
        }
       }
       ,error : (err : AppError) => {
         if (err instanceof NotFoundError){
           console.log(err)
         }
       }
     });
    // return meeting
    //   ? this.setMeetingUrl(meeting)
    //   : this.router.navigateByUrl('/home');
  }

  private setMeetingUrl(meeting: ZoomMeeting) {
    console.log(meeting)
    this.activeMeeting = meeting;
    this.url = `/zoom/${ meeting.meetingNumber }/${ meeting.meetingPassword }/${ this.role }`;
    this.router.navigateByUrl(this.url);
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Meeting } from '../interfaces/Meeting';
import { handleError } from './../exceptions/handleError';
import { CalendarEvent } from '../Meet-calendar/calendar/calendar'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json',
  }),
}

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  private urlTeacher = 'http://localhost:8000/dashboard/professeurs/';
  private urlStudent = 'http://localhost:8000/dashboard/eleves/';
  private urlMeet = 'http://localhost:8000/dashboard/meets/'
  constructor(
    private http : HttpClient
  ) { }

  getTeacherMeetings(id : number) : Observable<CalendarEvent[]>{
    return this.http.get<CalendarEvent[]>(this.urlTeacher+id+'/meetings/',httpOptions)
    .pipe(
      catchError(handleError)
  );
  }

  getStudentMeetings(id : number) : Observable<CalendarEvent[]>{
    console.log(this.urlStudent+id+'/meetings/')
    return this.http.get<CalendarEvent[]>(this.urlStudent+id+'/meetings/',httpOptions)
    .pipe(
      catchError(handleError)
  );
  }

  deleteTeacherMeeting(meeting:CalendarEvent,id : number) : Observable<CalendarEvent> {
    return this.http.delete<CalendarEvent>(this.urlTeacher + id + '/meetings/' + meeting.id +'/' , httpOptions)
    .pipe(
      catchError(handleError)
  );
  }

  deleteStudentMeeting(meeting:CalendarEvent,id : number) : Observable<CalendarEvent> {
    return this.http.delete<CalendarEvent>(this.urlStudent + id + '/meetings/' + meeting.id +'/' , httpOptions)
    .pipe(
      catchError(handleError)
  );
  }

  updateTeacherMeeting(meeting :CalendarEvent, id : number) : Observable<CalendarEvent> {
    return this.http.put<CalendarEvent>(this.urlTeacher + id + '/meetings/' + meeting.id + '/' ,meeting , httpOptions)
    .pipe(
      catchError(handleError)
    );
  }

  updateStudentMeeting(meeting :CalendarEvent, id : number) : Observable<CalendarEvent> {
    return this.http.put<CalendarEvent>(this.urlStudent + id + '/meetings/' + meeting.id + '/' ,meeting , httpOptions)
    .pipe(
      catchError(handleError)
    );
  }

  CreateTeacherMeeting(meeting : CalendarEvent, id :number) : Observable<CalendarEvent> {
    return this.http.post<CalendarEvent>(this.urlTeacher + id + '/meetings/' , meeting , httpOptions)
    .pipe(
      catchError(handleError)
  );
  }

  CreateStudentMeeting(meeting : CalendarEvent, id :number) : Observable<CalendarEvent> {
    return this.http.post<CalendarEvent>(this.urlStudent + id + '/meetings/' , meeting , httpOptions)
    .pipe(
      catchError(handleError)
  );
  }
  // /////////////////////////////////////////////////////////////////////////////////////
  getMeeting(id :number) : Observable<CalendarEvent[]> {
    return this.http.get<CalendarEvent[]>('http://localhost:8000/dashboard/getallmeets/' + id + '/', httpOptions)
    .pipe(
      catchError(handleError)
  );
  }

  createMeeting(meeting : CalendarEvent) : Observable<CalendarEvent> {
    return this.http.post<CalendarEvent>(this.urlMeet, meeting , httpOptions)
    .pipe(
      catchError(handleError)
  );
  }

  updateMeeting(meeting :CalendarEvent, id : number) : Observable<CalendarEvent> {
    return this.http.put<CalendarEvent>(this.urlMeet + meeting.id + '/' ,meeting , httpOptions)
    .pipe(
      catchError(handleError)
    );
  }

  deleteMeeting(meeting:CalendarEvent,id : number) : Observable<CalendarEvent> {
    return this.http.delete<CalendarEvent>(this.urlMeet + meeting.id +'/' , httpOptions)
    .pipe(
      catchError(handleError)
  );
  }
}


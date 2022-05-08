import { Observable } from 'rxjs';
import { Signature } from './../interfaces/Signature';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ZoomMtg } from '@zoomus/websdk';
import { AppError } from '../exceptions/AppError';
import { ZoomMeeting } from '../interfaces/ZoomMeeting';

@Injectable({
    providedIn: 'root'
})
export class ZoomService {

  leaveUrl = 'http://localhost:4200/'
  signatureEndpoint = 'http://localhost:8000/zoom/createSignature/'
  createMeetingEndPoint = 'http://localhost:8000/zoom/createMeeting/'
  // This Sample App has been updated to use SDK App type credentials https://marketplace.zoom.us/docs/guides/build/sdk-app
  sdkKey = 'QsO_S_azQ9SuDKv8Db3faQ'
  meetingSDKElement : any;
  role = 0
  userName = 'Angular'
  userEmail = 'wajdibejaoui26@gmail.com'
  passWord = ''
  meetingNumber !:string;

  constructor(private httpClient : HttpClient) { }

  loadZoom() {
    // ZoomMtg.preLoadWasm();
    // ZoomMtg.prepareJssdk();
  }

  startMeeting(role : string,meetingNumber : string, password : string) { // zoom.component calls this
    this.getSignature(role,meetingNumber, password);
  }

  getSignature(role : string, meetingNumber : string, password : string) {

    return this.httpClient.post(this.signatureEndpoint, {
	    meetingNumber: meetingNumber,
	    role: role
    });
  }

  createMeeting(email : string) : Observable<ZoomMeeting> {
    return this.httpClient.post<ZoomMeeting>(this.createMeetingEndPoint, {
	    email : email,
    });
  }



  joinMeeting (signature : string, meetingNumber : string, password : string) {
    // ZoomMtg.init({
    //   leaveUrl: this.leaveUrl,
    //   isSupportAV: true,
    //   success: (success : any) => {
    //     console.log(success)
    
    //     ZoomMtg.join({
    //       signature: signature,
    //       meetingNumber: meetingNumber,
    //       userName: this.userName,
    //       apiKey: this.sdkKey,
    //       userEmail: this.userEmail,
    //       passWord: password,
    //       success: (success: any) => {
    //         console.log(success)
    //       },
    //       error: (error : any) => {
    //         console.log(error)
    //       }
    //     })
    
    //   },
    //   error: (error : any) => {
    //     console.log(error)
    //   }
    // })
  }
}

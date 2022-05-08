import { ZoomService } from './../zoom.service';
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Signature } from 'src/app/interfaces/Signature';
import { AppError } from 'src/app/exceptions/AppError';
import { DOCUMENT } from '@angular/common';
import ZoomMtgEmbedded from '@zoomus/websdk/embedded';

@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.css']
})
export class ZoomComponent implements OnInit {
  display : boolean = false;
  meetingNumber !: string;
  passcode!: string;
  role!: string;
  apiKey = 'QsO_S_azQ9SuDKv8Db3faQ'
  client = ZoomMtgEmbedded.createClient();
  constructor(
    private route: ActivatedRoute,
    private zoomService: ZoomService,
    @Inject(DOCUMENT) document: any
  ) { }
  ngOnInit() {
    this.meetingNumber = this.route.snapshot.paramMap.get('meeting') || '';
    this.passcode = this.route.snapshot.paramMap.get('passcode') || '';
    this.role = this.route.snapshot.paramMap.get('role') || '';
    // this.zoomServ.loadZoom();
    this.getSignature()
    // return this.startMeeting();

  }
  startMeeting() {
    return this.zoomService.startMeeting(this.role,this.meetingNumber, this.passcode);
  }

  getSignature() {
    this.zoomService.getSignature(this.role, this.meetingNumber,this.passcode).subscribe( {
      next : (data : Signature) => {
         if(data.signature) {
        console.log(data.signature)
        // this.startMeeting(data.signature, meetingNumber, password)
        this.init(data.signature)
      } else {
        console.log(data)
      }
      },
        error : (err : AppError) => {
         console.log(err)
       }
      });
  }

  init(signature : string) {
    
    let meetingSDKElement = document.getElementById('meetingSDKElement');
    let meetingSDKChatElement = document.getElementById('meetingSDKChatElement');
    this.client.init({
      debug: true,
      zoomAppRoot: <HTMLElement>meetingSDKElement,
      language: 'en-US',
      customize: {
        video: {
          popper: {
            disableDraggable: true
          },
          
          isResizable: true,
          viewSizes: {
            
            default: {
              // width: 1000,
              // height: 600
              width: 720,
              height: 411
            },
            ribbon: {
              width: 240,
              height: 135
            }
          }
        },
        chat: {
          popper: {
            disableDraggable: true,
            anchorElement: meetingSDKChatElement,
            placement: 'top'
          }
        },
        meetingInfo: ['topic', 'host', 'mn', 'pwd', 'telPwd', 'invite', 'participant', 'dc', 'enctype'],
        toolbar: {
          buttons: [
            {
              text: 'Custom Button',
              className: 'CustomButton',
              onClick: () => {
                console.log('custom button');
              }
            }
          ]
        }
      }
    });
    
    
    this.client.join({
      apiKey: this.apiKey,
      signature: signature,
      meetingNumber: this.meetingNumber,
      password: this.passcode,
      userName: 'userName'
    })

  }



}

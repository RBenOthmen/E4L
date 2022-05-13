import { Component, OnInit } from '@angular/core';
import { NgAudioRecorderService, OutputFormat } from 'ng-audio-recorder';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-audio-recorder',
  templateUrl: './audio-recorder.component.html',
  styleUrls: ['./audio-recorder.component.css']
})
export class AudioRecorderComponent implements OnInit {

    //Will use this flag for toggeling recording
    recording = false;
    //URL of Blob
    url!: any;
  
  constructor(private audioRecorderService: NgAudioRecorderService,
    private domSanitizer: DomSanitizer) {
    
    this.audioRecorderService.recorderError.subscribe(recorderErrorCase => {
        // Handle Error
    })
  }

  startRecording() {
    this.audioRecorderService.startRecording();
    this.recording = true;
  }

  stopRecording() {
    this.recording = false;
      this.audioRecorderService.stopRecording(OutputFormat.WEBM_BLOB).then((output) => {
          // do post output steps
        // this.url = output;
        console.log(output)
        this.processRecording(output);
      }).catch(errrorCase => {
          // Handle Error
      });
  }

  processRecording(blob : any) {
    this.url = URL.createObjectURL(blob);
    console.log("blob", blob);
    console.log("url", this.url);
  }

  sanitize(url: string) {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  textToSpeech(text : string) {
    let synth = speechSynthesis;
    let utternance = new SpeechSynthesisUtterance(text);
    // for (let voice of synth.getVoices()) {
    //   console.log(voice)
    // }
    // utternance.voice
    synth.speak(utternance); // speack the speech/utternance
    // if (synth.speaking)
  }

  ngOnInit(): void {
  }

}

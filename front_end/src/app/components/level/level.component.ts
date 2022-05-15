import { CourseService } from 'src/app/services/course.service';
import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { Lesson } from 'src/app/interfaces/Lesson';
import { NgAudioRecorderService, OutputFormat } from 'ng-audio-recorder';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css'],
})
export class LevelComponent implements OnInit {
  isExpanded!: boolean;
  @Input('lesson') lesson!: Lesson;
  progress = 20;
  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';
  bufferValue = 75;
  word = 'word 3';
  microState = false;
  level = 'Level 1';

  //Will use this flag for toggeling recording
  recording = false;
  //URL of Blob
  url!: any;

  constructor(private router: Router, private courseService: CourseService,
    private audioRecorderService: NgAudioRecorderService,
    private domSanitizer: DomSanitizer) {}

  ngOnInit(): void {
    console.log(this.word);
    this.word = this.courseService.getWord();
    console.log(this.word);

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

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  toggleMicroState() {
    this.microState = !this.microState;
  }

  submitAnswer() {
    console.log('submitAnswer() clicked');
    // this.router.navigate(['']);
  }

  textToSpeech(text : string) {
    
    let synth = speechSynthesis;
    let utternance = new SpeechSynthesisUtterance();
    utternance.rate = 0.7 ; // 0.1 to 10;
    utternance.pitch = 1.5 ; //  0 to 2
    utternance.text = text;
    // for (let voice of synth.getVoices()) {
    //   console.log(voice)
    // }
    // utternance.voice
    synth.speak(utternance); // speack the speech/utternance
    if (synth.speaking) {
      this.microState = true;
      console.log('here')
    } 
    this.microState = false;
  }


}

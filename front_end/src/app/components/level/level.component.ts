import { UiService } from './../../services/ui.service';
import { AuthService } from 'src/app/services/auth.service';
import { Progress } from './../../interfaces/Progress';
import { ProgressService } from './../../services/progress.service';
import { LessonElement } from 'src/app/interfaces/LessonElement';
import { LessonsService } from 'src/app/services/lessons.service';
import { CourseService } from 'src/app/services/course.service';
import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Lesson } from 'src/app/interfaces/Lesson';
import { NgAudioRecorderService, OutputFormat } from 'ng-audio-recorder';
import { DomSanitizer } from '@angular/platform-browser';
import { NotFoundError } from 'rxjs';
import { AppError } from 'src/app/exceptions/AppError';


@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css'],
})
export class LevelComponent implements OnInit {
  isExpanded!: boolean;
  @Input('lesson') lesson!: Lesson;
  // progress = 20;
  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';
  bufferValue = 75;
  word = 'word 3';
  microState = false;
  level = 'Level 1';
  elementId !: string;
  lessonId !: string;
  action : string = '';
  //Will use this flag for toggeling recording
  recording = false;
  //URL of Blob
  url!: any;
  lessonProgress !: number;
  element : LessonElement = {};

  constructor(private router: Router, private courseService: CourseService,
    private audioRecorderService: NgAudioRecorderService,
    private domSanitizer: DomSanitizer,
    private lessonService : LessonsService,
    private route : ActivatedRoute,
    private progressService : ProgressService,
    private authService : AuthService,
    private uiService : UiService) {}

  ngOnInit(): void {
    // console.log(this.word);
    // this.word = this.courseService.getWord();
    // console.log(this.word);
    
    console.log('ngoninit')
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.elementId = <string>params.get('elementid')
      this.lessonId = <string>params.get('lessonid')
    })
    // this.elementId = this.route.snapshot.paramMap.get('elementid') || '0';
    // this.lessonId = this.route.snapshot.paramMap.get('lessonid') || '0';
    this.lessonService.getElementById(this.elementId).subscribe({
      next: response => {
        
        this.element = response;
        console.log(response)
      }
      , error: (err: AppError) => {
        if (err instanceof NotFoundError) {
          console.log(err)
        }
      }
    });

    
    this.getProgress();
  }

  getProgress(){
    this.progressService.getLessonProgress(this.authService.getRoleId(),+this.lessonId).subscribe({
      next: response => {
        this.lessonProgress = response;
        console.log(response)
      }
      , error: (err: AppError) => {
        if (err instanceof NotFoundError) {
          console.log(err)
        }
      }
    });
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

  next() {
    this.lessonService.getNextLessonElement(this.elementId).subscribe({
      next: response => {
        console.log('go to level')
        console.log('/level/'+this.lessonId+'/'+response.id)
        // this.router.navigate(['/level/'+this.lessonId+'/'+response.id]);
        this.router.navigateByUrl('/', { skipLocationChange: true })
          .then(() => this.router.navigate(['/level/'+this.lessonId+'/'+response.id]));
        // this.router.navigate(['level']);
      }
      , error: (err: AppError) => {
        if (err instanceof NotFoundError) {
          console.log(err)
        }
      }
    })
  }

  changeProgress() {
    let eleve_id = this.authService.getRoleId();

    this.progressService.getCurrentProgess(eleve_id,this.lessonId).subscribe({
      next: response => {
        let progress : Progress = response;
        progress.progression = +this.elementId
        console.log(progress)
        this.updateProgress(progress)
        console.log("changeProgress ")
      }
      , error: (err: AppError) => {
        console.log(err)
        this.createProgress(); // to do
        if (err instanceof NotFoundError) {
          console.log('404')
        }
        
      }
    })

    
  }

  checkProgress() {
    this.progressService.getLessonProgress(this.authService.getRoleId(),+this.lessonId).subscribe({
      next: response => {
        if (response == 100) {
          this.lessonProgress = response;
          this.uiService.toastSuccess('this lesson has been completed');
          this.router.navigate(['/dashboard/']);
        }
      }
      , error: (err: AppError) => {
        if (err instanceof NotFoundError) {
          console.log(err)
        }
      }
    });
  }

  updateProgress(progress : Progress) {
    this.action='success';
    
    this.progressService.updateStudentProgess(progress).subscribe({
      next: response => {
        // this.next();
        this.checkProgress()
        console.log("updateProgress ")
      
      }
      , error: (err: AppError) => {
        console.log(err)
        if (err instanceof NotFoundError) {
          
        }
      }
    })
  }

  createProgress() {
    this.action='success';
    let progress : Progress = {
      lesson_id : +this.lessonId,
      progression : +this.elementId,
      eleve_id : this.authService.getRoleId(),

    };
    this.progressService.createStudentProgess(progress).subscribe({
      next: response => {
        // this.next();
        console.log("createProgress ")
      }
      , error: (err: AppError) => {
        console.log(err)
        if (err instanceof NotFoundError) {
          this.createProgress();
        }
      }
    })
  }



}

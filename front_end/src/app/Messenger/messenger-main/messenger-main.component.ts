import { LoaderService } from './../../services/loader.service';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-messenger-main',
  templateUrl: './messenger-main.component.html',
  styleUrls: ['./messenger-main.component.css']
})
export class MessengerMainComponent implements OnInit {

  
  public getScreenWidth: any;
  public getScreenHeight: any;
  constructor(private loaderService : LoaderService) { 
    loaderService.hideLoader()
  }
  
  ngOnInit() {
      this.getScreenWidth = window.innerWidth;
      this.getScreenHeight = window.innerHeight;
  }
  
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }

}

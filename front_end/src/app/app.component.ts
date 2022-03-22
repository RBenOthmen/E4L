import { LoaderService } from './services/loader.service';
import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'E4L';
  // loading : boolean =false;
  showLoader$ = this.loaderService.loadingAction$;
  constructor(public authService :AuthService,
    private loaderService : LoaderService) {

  }

  ngOnInit(): void {
   
  }

}

import { LoaderService } from './services/loader.service';
import {Component, OnInit} from '@angular/core';
import { AuthService } from './services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


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
              private loaderService : LoaderService,
              private router : Router) {

  }

  ngOnInit(): void {}

  hasRoute(route : string) : boolean {
    return this.router.url == route;
  }

  showNavBar() : boolean {
    

    if (this.hasRoute('/login'))
      return false
    else if (this.hasRoute('/signup'))
      return false
    else if (this.hasRoute('/password-reset'))
      return false
    else if (this.hasRoute('/activate'))
      return false
    return true
  }

}

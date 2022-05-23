import { LoaderService } from './services/loader.service';
import {Component, OnInit} from '@angular/core';
import { AuthService } from './services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'E4L';
  // loading : boolean =false;
  showLoader$ = this.loaderService.getLoader();
  showSpinner !: boolean;
  

  constructor(public authService :AuthService,
              private loaderService : LoaderService,
              private router : Router,
              private translateService : TranslateService) {
    this.translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem('lang') || 'en');

  }

  ngOnInit(): void {
    this.showLoader$.subscribe(result => {
      this.showSpinner = result
      console.log(result)
    })
  }

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

import { LoaderService } from './../services/loader.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loading : boolean =true;
  constructor(private router:Router,
    private loaderService : LoaderService) { 
      this.loaderService.hideLoader();
    }

  ngOnInit(): void {

    // this.loaderService.hideLoader();
  }

  goToSignup() {
    this.router.navigate(['/signup'])
  }

  goToSignin() {
    this.router.navigate(['/login'])
  }

}

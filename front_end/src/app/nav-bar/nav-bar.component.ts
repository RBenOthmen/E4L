
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(public authService :AuthService,
    private route : ActivatedRoute,
    private router :Router) { }

  ngOnInit(): void {
    /*this.route.paramMap
    .subscribe(params => {
      console.log(params)
      let route : string | null = params.get('id');
      console.log(route)
    });*/
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['login']);
  }

}

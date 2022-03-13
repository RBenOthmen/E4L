import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  loginForm!: FormGroup;

  invalidLogin : boolean = false;

  constructor(public authService : AuthService,
    private router :Router) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      "username": new FormControl(null, [Validators.required, Validators.minLength(4)]),
      "password": new FormControl(null, [Validators.required, Validators.minLength(4)])
    })
  }

  login() {
    console.log(this.loginForm.value);
    this.loginForm.reset();
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }


  signIn() {
    //let credentials = this.loginForm.getRawValue()
    let credentials = {
      username : this.loginForm.get('username')?.value,
      password : this.loginForm.get('password')?.value
    }
    let result = this.authService.login(credentials)
      .subscribe(
      response => {
          this.router.navigate(['/']); 
      });
    
      if (this.authService.isLoggedIn()==false) {
        
        this.invalidLogin= true;
      }
     
    
  }


  goToSignup() {
    this.router.navigate(['/signup'])
  }
  

}

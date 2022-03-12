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

  constructor(private authService : AuthService,
    private router :Router) {
  }

  goToSignup() {
    this.router.navigate(['/signup'])
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      "name": new FormControl(null, [Validators.required, Validators.minLength(4)]),
      "password": new FormControl(null, [Validators.required, Validators.minLength(4)])
    })
  }

  login() {
    console.log(this.loginForm.value);
    this.loginForm.reset();
    this.router.navigate(['/']);
  }

  get name() {
    return this.loginForm.get('name');
  }

  get password() {
    return this.loginForm.get('password');
  }


  signIn() {
    //let credentials = this.loginForm.getRawValue()
    let credentials = {
      username : this.loginForm.get('name')?.value,
      password : this.loginForm.get('password')?.value
    }
    let result = this.authService.login(credentials)
      .subscribe(
      response => {
        if (response && response.access) {
          localStorage.setItem('token', response.access);
          this.router.navigate(['/']);
        }
      });



  }

}

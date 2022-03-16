import { Unauthorized } from './../exceptions/Unauthorized';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';
import { AppError } from '../exceptions/AppError';
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

  goToSignup() {
    this.router.navigate(['/signup'])
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      "username": new FormControl(null, [Validators.required, Validators.minLength(4)]),
      "password": new FormControl(null, [Validators.required, Validators.minLength(4)])
    })
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }


  signIn() {

    let credentials = {
      username : this.loginForm.get('username')?.value,
      password : this.loginForm.get('password')?.value
    }
    this.authService.login(credentials)
      .subscribe({
        next : response => {
          this.router.navigate(['/']);
        }
        ,error : (err : AppError) => {
          if (err instanceof Unauthorized)
          this.invalidLogin= true;
          else throw err;
        }
       });


  }





}

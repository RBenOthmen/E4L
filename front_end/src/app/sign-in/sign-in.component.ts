import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  loginForm!: FormGroup;

  constructor() {
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
  }

  get name() {
    return this.loginForm.get('name');
  }

  get password() {
    return this.loginForm.get('password');
  }

}

import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../interfaces/user"
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { BadInput } from '../exceptions/BadInput';
import { AppError } from '../exceptions/AppError';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  isToggled : boolean = false;
  registerForm!: FormGroup;
  showPassword : string = "password";
  invalidSignup : boolean = false;
  serverOffline : boolean = false;

  constructor(private userService: UserService,
    private authService : AuthService,
    private router :Router) {
  }

  goToSignin() {
    this.router.navigate(['/login'])
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      "first_name": new FormControl(null, [Validators.required, Validators.minLength(3), Validators.pattern('([a-zA-Z ]+)')]),
      "last_name": new FormControl(null, [Validators.required, Validators.minLength(3), Validators.pattern('([a-zA-Z ]+)')]),
      "username": new FormControl(null, [Validators.required, Validators.minLength(3), Validators.pattern('(^[a-zA-Z ]+[0-9]*)')]),
      "email": new FormControl(null, [Validators.required, Validators.email]),
      "password": new FormControl(null, [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
      "birthday": new FormControl(null, [Validators.required, Validators.pattern('[0-9]{4}-[0-9]{2}-[0-9]{2}')]),
      "phone": new FormControl(null, [Validators.required, Validators.min(10000000), Validators.max(99999999)]),
      "user" : new FormControl(null, Validators.required),
    })
  }


  // begin getters
  get first_name() {
    return this.registerForm.get('first_name');
  }

  get last_name() {
    return this.registerForm.get('last_name');
  }

  get username() {
    return this.registerForm.get('username');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get birthday() {
    return this.registerForm.get('birthday');
  }

  get phone() {
    return this.registerForm.get('phone');
  }


  get passwordStatus(){
    return this.registerForm.get('passwordStatus');
  }

  get user(){
    return this.registerForm.get('user');
  }
  // end getters


  // onToggle() {if (this.user?.value == 'teacher')
  //     this.isToggled = false;
  //   else if (this.user?.value == 'student')
  //     this.isToggled = true;
  // }

  togglePassword() {
    if (this.showPassword == 'password')
      this.showPassword = 'text';
    else if (this.showPassword == 'text')
    this.showPassword = 'password';
  }


  register() {
    let user : User = this.getUser();

    this.authService.signup(user).subscribe( {
      next : response => {
        this.registerForm.reset();
        this.router.navigate(['/login']);
      },
        error : (err : AppError) => {
         if (err instanceof BadInput){
          console.log(err)
          this.invalidSignup = true;
         }
         else {
           this.serverOffline = true;
         }
       }
      });
  }

  getUser() : User{
    return  {
      first_name : this.first_name?.value,
      last_name : this.first_name?.value,
      email : this.email?.value,
      password : this.password?.value,
      username : this.username?.value,
      phone : this.phone?.value,
      birth_date : this.birthday?.value,
      type : this.user?.value,
    };
  }


}

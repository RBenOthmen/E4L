import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../interfaces/user"
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AppError } from '../exceptions/AppError';
import { BadInput } from '../exceptions/BadInput';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  isToggled : boolean = false;
  registerForm!: FormGroup;
  users!: User[];

  constructor(private userService: UserService,
    private authService : AuthService,
    private router :Router) {
  }

  goToSignin() {
    this.router.navigate(['/login'])
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      "first_name": new FormControl(null, [Validators.required, Validators.minLength(4)]),
      "last_name": new FormControl(null, [Validators.required, Validators.minLength(4)]),
      "username": new FormControl(null, [Validators.required, Validators.minLength(4)]),
      "email": new FormControl(null, [Validators.required, Validators.email]),
      "password": new FormControl(null, [Validators.required, Validators.minLength(4)]),
      "birthday": new FormControl(null, Validators.required),
      "phone": new FormControl(null, [Validators.required, Validators.min(10000000), Validators.max(99999999)]),
      "user": new FormControl(null, Validators.required),
      "formation": new FormControl(null, [Validators.required, Validators.minLength(4)]),
    })
  }

  isEmpty(word: any): boolean {
    //console.log(word, "le type est", typeof word)
    if (word.valueOf().length == 0) {
      //console.log(word, " is empty")
      return true;
    } else {
      //console.log(" length = ", word.valueOf().length)
      //console.log(word.valueOf())
      return false;
    }
  }

  register() {
    let user : User = {
      first_name : this.first_name?.value,
      last_name : this.last_name?.value,
      email : this.email?.value,
      password : this.password?.value,
      username : this.username?.value,
      phone : this.phone?.value,
      birth_date : this.birthday?.value,
      type : this.user?.value,
      formation : this.formation?.value
    };

    this.authService.signup(user).subscribe( {
      next : response => {
        this.router.navigate(['/login']); 
      },
        error : (err : AppError) => {
         if (err instanceof BadInput)
           alert('bad input')
         else throw err;
       }
      });
    this.registerForm.reset();
    this.router.navigate(['/']);
  }

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


  get phone() {
    return this.registerForm.get('phone');
  }

  get birthday() {
    return this.registerForm.get('birthday');
  }

  get user(){
    return this.registerForm.get('user');
  }

  get formation(){
    return this.registerForm.get('formation');
  }

  onToggle() {
    if (this.user?.value == 'teacher')
      this.isToggled = false;
    else if (this.user?.value == 'student')
      this.isToggled = true;

  }

  
}

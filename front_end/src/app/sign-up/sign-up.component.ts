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
      "first_name": new FormControl(null, [Validators.required, Validators.minLength(3), Validators.pattern('([a-zA-Z ]+)')]),
      "last_name": new FormControl(null, [Validators.required, Validators.minLength(3), Validators.pattern('([a-zA-Z ]+)')]),
      "username": new FormControl(null, [Validators.required, Validators.minLength(3), Validators.pattern('(^[a-zA-Z ]+[0-9]*)')]),
      "email": new FormControl(null, [Validators.required, Validators.email]),
      "password": new FormControl(null, [Validators.required, Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&\"\'()-_çà=]*')]),
      "birthday": new FormControl(null, [Validators.required, Validators.pattern('^(?:0[1-9]|[12]\d|3[01])([\/.-])(?:0[1-9]|1[012])\\1(?:19|20)\d\d$')]),
      "phone": new FormControl(null, [Validators.required, Validators.min(10000000), Validators.max(99999999)]),
      "formation": new FormControl(null, [Validators.required, Validators.minLength(4)]),
      "user" : new FormControl(null, Validators.required),
    })
  }

  inputControl(name:string):string{
    if(name.length < 3){
      return ""
    }
    return ""
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

  get formation(){
    return this.registerForm.get('formation');
  }

  get user(){
    return this.registerForm.get('user');
  }
  // end getters

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

  // onToggle() {if (this.user?.value == 'teacher')
  //     this.isToggled = false;
  //   else if (this.user?.value == 'student')
  //     this.isToggled = true;
  // }


  register() {
    let user : User = {
      first_name : this.first_name?.value,
      last_name : this.first_name?.value,
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


}

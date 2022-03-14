import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppError } from 'src/app/exceptions/AppError';
import { BadInput } from 'src/app/exceptions/BadInput';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent implements OnInit {

  isToggled : boolean = false;
  profileForm!: FormGroup;
  users!: User[];

  constructor(private authService : AuthService,
    private router :Router) {
  }

  goToSignin() {
    this.router.navigate(['/login'])
  }

  ngOnInit(): void {
    this.profileForm = new FormGroup({
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

  save() {
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
         
      },
        error : (err : AppError) => {
         if (err instanceof BadInput)
           alert('bad input')
         else throw err;
       }
      });
    
    
  }

  get first_name() {
    return this.profileForm.get('first_name');
  }

  get last_name() {
    return this.profileForm.get('last_name');
  }

  get username() {
    return this.profileForm.get('username');
  }

  get email() {
    return this.profileForm.get('email');
  }

  get password() {
    return this.profileForm.get('password');
  }


  get phone() {
    return this.profileForm.get('phone');
  }

  get birthday() {
    return this.profileForm.get('birthday');
  }

  get user(){
    return this.profileForm.get('user');
  }

  get formation(){
    return this.profileForm.get('formation');
  }

  onToggle() {
    if (this.user?.value == 'teacher')
      this.isToggled = false;
    else if (this.user?.value == 'student')
      this.isToggled = true;

  }

}

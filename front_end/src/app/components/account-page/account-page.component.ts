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
  showPassword : string = "password";
  isToggled : boolean = false;
  profileForm!: FormGroup;
  users!: User[];

  currentUser : User = {
  }

  constructor(public authService : AuthService,
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
      "currentPassword": new FormControl(null, [Validators.required, Validators.minLength(4)]),
      "newPassword": new FormControl(null, [Validators.required, Validators.minLength(4)]),
      "confirmPassword": new FormControl(null, [Validators.required, Validators.minLength(4)]),
      "birthday": new FormControl(null, Validators.required),
      "phone": new FormControl(null, [Validators.required, Validators.min(10000000), Validators.max(99999999)]),
      "user": new FormControl(null, Validators.required),

    });
    this.authService.getUserDetails()
    .subscribe(
      response => {
        this.currentUser.email = response.email;
        this.currentUser.username = response.username;
        this.currentUser.first_name = response.first_name;
        this.currentUser.last_name = response.last_name;
        this.currentUser.password = response.password;
      }
    );
    console.log(this.authService.currentUser.first_name)
    document.getElementById('first_name')?.setAttribute(<string>this.authService.currentUser.first_name, '');
    // document.getElementById("first_name").innerHTML = <string>this.authService.currentUser.first_name;
  }



  isEmpty(word: any): boolean {
    if (word.valueOf().length == 0) {
      return true;
    } else {
      return false;
    }
  }

  updatePassword() : void {

    this.authService.changePassword({
      current_password : this.currentPassword?.value,
      new_password : this.newPassword?.value,
    }).subscribe({
      next : response => {
        console.log("password success");
      },
        error : (err : AppError) => {
          console.log(err);
       }
   });
  }

  updateUsername() : void {
    
    this.authService.changeUsername({
      current_password : this.currentPassword?.value,
      new_username : this.username?.value,
    }).subscribe({
      next : response => {
        console.log("username success")
      },
        error : (err : AppError) => {
          console.log(err)
       }
   });
  }

  updateUser(data : any) : void {
    let user : User = {
      first_name : this.first_name?.value,
      last_name : this.last_name?.value,
      email : this.email?.value,
      birth_date : this.birthday?.value,
      phone : this.email?.value,
    };
    this.authService.updateUser(data).subscribe({
      next : response => {
        console.log("update success")
      },
        error : (err : AppError) => {
          console.log(err)
       }
    });
  }

  save() {
    // document.getElementById("first_name").innerHTML = <string>this.authService.currentUser.first_name;
    console.log(this.authService.currentUser.first_name)

    if (!!this.newPassword?.value) {
      if (this.newPassword?.value == this.confirmPassword?.value) {
        this.updatePassword()
      }
    }

    if (this.username?.value != this.currentUser.username) {
      if (!!this.currentPassword?.value) {
        this.updateUsername()
      }
    }

    if (this.email?.value != this.currentUser.email) {
      this.updateUser({email : this.email?.value});
    }

    if (this.first_name?.value !== this.currentUser.first_name) {
      this.updateUser({first_name : this.first_name?.value});
    }

    if (this.last_name?.value !== this.currentUser.last_name) {
      this.updateUser({last_name : this.last_name?.value});
    }

    if (this.phone?.value !== this.currentUser.phone) {
      this.updateUser({phone : this.phone?.value});
    }

    if (this.birthday?.value !== this.currentUser.birth_date) {
      this.updateUser({birth_date : this.birthday?.value});
    }

    // if (this.email?.value !== this.currentUser.email ||
    //   this.first_name?.value !== this.currentUser.first_name ||
    //   this.last_name?.value !== this.currentUser.last_name ||
    //   this.phone?.value !== this.currentUser.phone ||
    //   this.birthday?.value !== this.currentUser.birth_date) {
    //   if (!!this.currentPassword?.value) {
    //     console.log(this.email?.value)
    //     console.log(this.currentUser.email)
    //     console.log(this.email?.value != this.currentUser.email)
    //     this.updateUser()
    //   }
    // }
    
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

  get currentPassword() {
    return this.profileForm.get('currentPassword');
  }

  get newPassword() {
    return this.profileForm.get('newPassword');
  }

  get confirmPassword() {
    return this.profileForm.get('confirmPassword');
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

  // updateName() {
  //   this.first_name.setValue('Nancy');
  // }

  togglePassword() {
    if (this.showPassword == 'password')
      this.showPassword = 'text';
    else if (this.showPassword == 'text')
    this.showPassword = 'password';
  }

}

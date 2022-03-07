import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../interfaces/user"

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  registerForm!: FormGroup;
  users!: User[];

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      "name": new FormControl(null, [Validators.required, Validators.minLength(4)]),
      "email": new FormControl(null, [Validators.required, Validators.email]),
      "password": new FormControl(null, [Validators.required, Validators.minLength(4)]),
      "domain": new FormControl(null, Validators.required),
      "birthday": new FormControl(null, Validators.required),
      "phone": new FormControl(null, [Validators.required, Validators.min(10000000), Validators.max(99999999)])
    })
  }

  isEmpty(word: any): boolean {
    console.log(word, "le type est", typeof word)
    if (word.valueOf().length == 0) {
      console.log(word, " is empty")
      return true;
    } else {
      console.log(" length = ", word.valueOf().length)
      console.log(word.valueOf())
      return false;
    }
  }

  register() {
    // let user: User = {
    //   email: "rami@gmail.com", fullName: "rami ben othmen", password: "0000"
    // }
    // this.userService.postUser(user).subscribe(response => {
    //   this.users.push(response);
    // });
    console.log(this.registerForm.value);
    this.registerForm.reset();
  }

  get name() {
    return this.registerForm.get('name');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get domain() {
    return this.registerForm.get('domain');
  }

  get phone() {
    return this.registerForm.get('phone');
  }

  get birthday() {
    return this.registerForm.get('birthday');
  }
}

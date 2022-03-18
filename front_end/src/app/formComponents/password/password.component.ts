import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  @Output('newPasswordEvent') newPasswordEvent = new EventEmitter<string>();
  showPassword : string = "password";
  form!: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      "password": new FormControl(null, [Validators.required, Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&\"\'()-_çà=]*')]),
    })
    this.newPasswordEvent.emit(this.password?.value);
  }


  togglePassword() {
    if (this.showPassword == 'password')
      this.showPassword = 'text';
    else if (this.showPassword == 'text')
    this.showPassword = 'password';
  }

  get password() {
    return this.form.get('password');
  }

}

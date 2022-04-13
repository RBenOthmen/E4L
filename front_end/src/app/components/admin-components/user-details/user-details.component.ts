import { User } from 'src/app/interfaces/user';
import { Teacher } from 'src/app/interfaces/Teacher';
import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/interfaces/Student';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  student: Student | undefined;
  teacher: Teacher | undefined;
  user: User | undefined;
  form: FormGroup | any;

  constructor() {}

  ngOnInit(): void {}

  submitForm(user: User) {}
}

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { Student } from 'src/app/interfaces/Student';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AppError } from 'src/app/exceptions/AppError';
import { Teacher } from 'src/app/interfaces/Teacher';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { BadInput } from 'src/app/exceptions/BadInput';
import { BirthDateValidators } from 'src/app/sign-up/date.validators';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  // form: FormGroup | undefined;
  isToggled: boolean = false;
  showPassword: string = 'password';
  createUserForm!: FormGroup;
  createTeacherForm!: FormGroup;
  invalidSignup: boolean = false;
  serverOffline: boolean = false;

  constructor(
    private router: Router,
    private adminService: AdminService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.createUserForm = new FormGroup({
      first_name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('([a-zA-Z ]+)'),
      ]),
      last_name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('([a-zA-Z ]+)'),
      ]),
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('(^[a-zA-Z ]+[0-9]*)'),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
        ),
      ]),
      birthday: new FormControl(null, [Validators.required ,Validators.pattern('[0-9]{4}-[0-9]{2}-[0-9]{2}')]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.min(10000000),
        Validators.max(99999999),
      ]),
      user: new FormControl(null, Validators.required),
    });

    this.createTeacherForm = new FormGroup({
      first_name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('([a-zA-Z ]+)'),
      ]),
      last_name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('([a-zA-Z ]+)'),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.min(10000000),
        Validators.max(99999999),
      ]),
      birthday: new FormControl(null, [Validators.required ,Validators.pattern('[0-9]{4}-[0-9]{2}-[0-9]{2}')]),
      linkedIn: new FormControl(null, Validators.required),
      user: new FormControl(null, Validators.required),
    });
  }

  getStudents() {
    this.router.navigate(['/admin-students']);
  }

  getTeachers() {
    this.router.navigate(['/admin-teachers']);
  }

  createStudent(student: Student) {
    student.role = 'S';
    console.log(student);
    this.adminService.CreateStudent(student).subscribe({
      next: (response) => {
        console.log('Student created successfully');
      },
      error: (err: AppError) => {
        console.log(err);
      },
    });
  }

  addTeacher(teacher: Teacher) {
    teacher.role = 'T';
    this.adminService.CreateTeacher(teacher).subscribe({
      next: (response) => {
        console.log('Teacher created successfully');
      },
      error: (err: AppError) => {
        console.log(err);
      },
    });
  }

  createUser() {
    let user: User = this.getUser();
    console.log(user);
    this.authService.signup(user).subscribe({
      next: (response) => {
        this.createUserForm.reset();
      },
      error: (err: AppError) => {
        if (err instanceof BadInput) {
          console.log(err);
          this.invalidSignup = true;
        } else {
          this.serverOffline = true;
        }
      },
    });
  }

  createTeacher() {
    let user: User = this.getUser();
    user.role = 'T';
    console.log(user);
    this.authService.signup(user).subscribe({
      next: (response) => {
        this.createUserForm.reset();
      },
      error: (err: AppError) => {
        if (err instanceof BadInput) {
          console.log(err);
          this.invalidSignup = true;
        } else {
          this.serverOffline = true;
        }
      },
    });
  }

  getUser(): User {
    return {
      first_name: this.first_name?.value,
      last_name: this.last_name?.value,
      email: this.email?.value,
      password: this.password?.value,
      username: this.username?.value,
      phone: this.phone?.value,
      birth_date: this.birthday?.value,
      type: this.user?.value,
    };
  }

  // begin getters
  get first_name() {
    return this.createUserForm.get('first_name');
  }

  get last_name() {
    return this.createUserForm.get('last_name');
  }

  get username() {
    return this.createUserForm.get('username');
  }

  get email() {
    return this.createUserForm.get('email');
  }

  get password() {
    return this.createUserForm.get('password');
  }

  get birthday() {
    return this.createUserForm.get('birthday');
  }

  get phone() {
    return this.createUserForm.get('phone');
  }

  get passwordStatus() {
    return this.createUserForm.get('passwordStatus');
  }

  get user() {
    return this.createUserForm.get('user');
  }
  // end getters
}

import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppError } from 'src/app/exceptions/AppError';
import { NotFoundError } from 'src/app/exceptions/not-found-error';
import { Teacher } from 'src/app/interfaces/Teacher';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-admin-teachers-list',
  templateUrl: './admin-teachers-list.component.html',
  styleUrls: ['./admin-teachers-list.component.css'],
})
export class AdminTeachersListComponent implements OnInit {
  // teachers!: Teacher[];
  // @Input('teacher') teacher!: Teacher;

  // constructor(private adminService: AdminService) {}

  // ngOnInit(): void {
  //   this.adminService.getTeachers().subscribe({
  //     next: (result) => (this.teachers = result),
  //     error: (err: AppError) => {
  //       if (err instanceof NotFoundError) {
  //         console.log(err);
  //       }
  //     },
  //   });
  // }

  // deleteTeacher(teacher: Teacher) {
  //   // this.authService.getCurrentTeacherInfo().subscribe((response) => { //getTeacher mel authService or adminService
  //   //   this.teacher.first_name = response.first_name;
  //   //   this.teacher.last_name = response.last_name;
  //   //   this.teacher.email = response.email;
  //   //   this.teacher.birth_date = response.birth_date;
  //   //   this.teacher.phone = response.phone;
  //   //   this.teacher.linkedin = response.linkedin;
  //   // });
  //   this.adminService.deleteTeacher(teacher).subscribe({
  //     next: (response) => {
  //       console.log('Teacher deleted successfully');
  //     },
  //     error: (err: AppError) => {
  //       console.log(err);
  //     },
  //   });
  // }

  // updateTeacher(teacher: Teacher) {
  //   this.adminService.updateTeacher(teacher).subscribe({
  //     next: (response) => {
  //       console.log('Teacher updated successfully');
  //     },
  //     error: (err: AppError) => {
  //       console.log(err);
  //     },
  //   });
  // }

  actionBtn : string = "Add";
  isToggled : boolean = false;
  showPassword : string = "password";
  userForm!: FormGroup;
  @Input('teacher') teacher!: Teacher;

  constructor(private userService: UserService,
    private authService : AuthService,
    @Inject(MAT_DIALOG_DATA) public editData : User,
    private dialogRef : MatDialogRef<AdminTeachersListComponent>) {
  }


  ngOnInit(): void {
    this.userForm = new FormGroup({
      "first_name": new FormControl(null, [Validators.required, Validators.minLength(3), Validators.pattern('([a-zA-Z ]+)')]),
      "last_name": new FormControl(null, [Validators.required, Validators.minLength(3), Validators.pattern('([a-zA-Z ]+)')]),
      "username": new FormControl(null, [Validators.required, Validators.minLength(3), Validators.pattern('(^[a-zA-Z ]+[0-9]*)')]),
      "email": new FormControl(null, [Validators.required, Validators.email]),
      "password": new FormControl(null, [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
      "birthday": new FormControl(null, [Validators.required, Validators.pattern('[0-9]{4}-[0-9]{2}-[0-9]{2}')]),
      "phone": new FormControl(null, [Validators.required, Validators.min(10000000), Validators.max(99999999)]),
      "user" : new FormControl(null, Validators.required),
    });

    if (this.editData) {
      this.actionBtn = "Update"
      this.userForm.controls["first_name"].setValue(this.editData.first_name);
      this.userForm.controls["last_name"].setValue(this.editData.last_name);
      this.userForm.controls["username"].setValue(this.editData.username);
      this.userForm.controls["email"].setValue(this.editData.email);
      this.userForm.controls["birthday"].setValue(this.editData.birth_date);
      this.userForm.controls["phone"].setValue(this.editData.phone);
      // this.userForm.controls["user"].setValue(this.editData.first_name);
    }
  }


  // begin getters
  get first_name() {
    return this.userForm.get('first_name');
  }

  get last_name() {
    return this.userForm.get('last_name');
  }

  get username() {
    return this.userForm.get('username');
  }

  get email() {
    return this.userForm.get('email');
  }

  get password() {
    return this.userForm.get('password');
  }

  get birthday() {
    return this.userForm.get('birthday');
  }

  get phone() {
    return this.userForm.get('phone');
  }


  get passwordStatus(){
    return this.userForm.get('passwordStatus');
  }

  get user(){
    return this.userForm.get('user');
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

  onClick() {
    if (!this.editData)
      this.addUser()
    else if (this.editData)
      this.updateUser()
  }

  addUser() {

  }

  updateUser() {

  }
}

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { AppError } from 'src/app/exceptions/AppError';
import { Student } from 'src/app/interfaces/Student';
import { AdminService } from 'src/app/services/admin.service';
import { NotFoundError } from 'src/app/exceptions/not-found-error';

@Component({
  selector: 'app-admin-students',
  templateUrl: './admin-students.component.html',
  styleUrls: ['./admin-students.component.css'],
})
export class AdminStudentsComponent implements OnInit {
  students!: Student[];
  @Input('student') student!: Student;
  student_selected: any;
  updateUserForm!: FormGroup;

  constructor(private adminService: AdminService, private route: Router) {}

  getStudents() {
    this.adminService.getStudents().subscribe({
      next: (result) => (this.students = result),
      error: (err: AppError) => {
        if (err instanceof NotFoundError) {
          console.log(err);
        }
      },
    });
  }

  getStudent(id: number) {
    this.adminService.getStudent(id).subscribe({
      next: (result) => (this.student = result),
      error: (err: AppError) => {
        if (err instanceof NotFoundError) {
          console.log(err);
        }
      },
    });
  }

  ngOnInit(): void {
    this.getStudents();

    this.updateUserForm = new FormGroup({
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
      birth_date: new FormControl(null, [Validators.required ,Validators.pattern('[0-9]{4}-[0-9]{2}-[0-9]{2}')])
    });
  }

  deleteStudent(student: Student) {
    if (
      confirm(
        'Are you sure to delete ' + student.first_name + ' ' + student.last_name
      )
    ) {
      this.adminService.deleteStudent(student).subscribe({
        next: (response) => {
          console.log('Student deleted successfully');
          let index: number = this.students.indexOf(student);
          this.students.splice(index, 1);
          console.log(index);
        },
        error: (err: AppError) => {
          console.log(err);
        },
      });
    }
  }

  updateStudent(student: Student) {
    student.role = 'S';
    this.adminService.updateStudent(student).subscribe({
      next: (response) => {
        console.log(student);
        console.log('Student updated successfully');
      },
      error: (err: AppError) => {
        console.log(err);
      },
    });
  }

}

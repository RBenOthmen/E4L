import { AdminTeachersListComponent } from './../../admin-teachers-list/admin-teachers-list.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { AppError } from 'src/app/exceptions/AppError';
import { Student } from 'src/app/interfaces/Student';
import { AdminService } from 'src/app/services/admin.service';
import { NotFoundError } from 'src/app/exceptions/not-found-error';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/interfaces/user';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {Subject} from 'rxjs';


@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit, OnDestroy {
  users!: User[];
  @Input('student') student!: Student;
  updateUserForm!: FormGroup;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  element_data: User[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private adminService: AdminService, private router: Router,
              private dialog: MatDialog, private http: HttpClient) {}


  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {
    this.getStudents();

    console.log(this.users);
    console.log('nothing');

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


  filter(query: string) {
    console.log(query);
    // this.filteredUsers = (query) ?
    //   this.users.filter(u => u.username?.toLowerCase().includes(query.toLowerCase()));
    //   this.users;
  }

  getStudents() {
    this.adminService.getStudents().subscribe({
      next: (result) => (this.users = result, this.dtTrigger.next(this.users)),
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


  updateUser(user : User) {
    this.dialog.open(AdminTeachersListComponent, {
      width : '30%',
      data : user
    }).afterClosed().subscribe(
      val => {
        if (val === "Update")
          console.log()
      }
    );
  }

  addUser() {
    this.dialog.open(AdminTeachersListComponent, {
      width : '30%'
    }).afterClosed().subscribe(
      val => {
        if (val === "Add")
          console.log()
      }
    );
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
          let index: number = this.users.indexOf(student);
          this.users.splice(index, 1);
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

  createUser() {
    this.router.navigate(['/admin-users/new']);
  }

}


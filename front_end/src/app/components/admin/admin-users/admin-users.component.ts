import { UserCommentsComponent } from './../user-comments/user-comments.component';
import { AdminTeachersListComponent } from './../../admin-teachers-list/admin-teachers-list.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, Input, OnInit, OnDestroy, Inject } from '@angular/core';
import { AppError } from 'src/app/exceptions/AppError';
import { Student } from 'src/app/interfaces/Student';
import { AdminService } from 'src/app/services/admin.service';
import { NotFoundError } from 'src/app/exceptions/not-found-error';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TaskManagerService } from 'src/app/services/task-manager.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css'],
})
export class AdminUsersComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['first_name', 'last_name', 'phone', 'email', 'username', 'action'];
  dataSource!: MatTableDataSource<User>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  users!: User[];
  @Input('user') user!: User;
  updateUserForm!: FormGroup;
  element_data: User[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  comments!: Comment[];
  id!: number;

  constructor(
    private adminService: AdminService,
    private router: Router,
    private dialog: MatDialog,
    private taskManagerService: TaskManagerService,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  allComments(user: User) {
    this.dialog
      .open(UserCommentsComponent, {
        width: '100%',
        data : {
          comment : this.comments,
          id: user.id
        }
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'Add') console.log();
      });
  }

  getComments(user: User) {
    this.adminService
      .getComments(user.id || 0)
      .subscribe({
        next: (result) => (
          (console.log(result), this.comments = result, this.allComments(user))
        ),
        error: (err: AppError) => {
          if (err instanceof NotFoundError) {
            console.log(err);
          }
        },
      });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {
    // this.getStudents();
    this.getUsers();

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
      birth_date: new FormControl(null, [
        Validators.required,
        Validators.pattern('[0-9]{4}-[0-9]{2}-[0-9]{2}'),
      ]),
    });
  }

  filter(query: string) {
    console.log(query);
    // this.filteredUsers = (query) ?
    //   this.users.filter(u => u.username?.toLowerCase().includes(query.toLowerCase()));
    //   this.users;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getStudents() {
    this.adminService.getStudents().subscribe({
      next: (result) => {
        console.log(result);
        this.users = result;
        this.dtTrigger.next(this.users);
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err: AppError) => {
        if (err instanceof NotFoundError) {
          console.log(err);
        }
      },
    });
  }

  getUsers() {
    this.adminService.getUsers().subscribe({
      next: (result) => {
        console.log(result);
        this.users = result;
        this.dtTrigger.next(this.users);
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err: AppError) => {
        if (err instanceof NotFoundError) {
          console.log(err);
        }
      },
    });
  }

  getStudent(id: number) {
    this.adminService.getStudent(id).subscribe({
      next: (result) => (this.user = result),
      error: (err: AppError) => {
        if (err instanceof NotFoundError) {
          console.log(err);
        }
      },
    });
  }

  updateUser(user: User) {
    console.log(user);
    this.dialog
      .open(AdminTeachersListComponent, {
        width: '30%',
        data: user,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') this.getStudents();
        console.log();
      });
  }

  addUser() {
    this.dialog
      .open(AdminTeachersListComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'add') this.getStudents();
        console.log();
      });
  }

  deleteUser(student: Student) {
    if (
      confirm(
        'Are you sure to delete ' + student.first_name + ' ' + student.last_name
      )
    ) {
      this.adminService.deleteStudent(student).subscribe({
        next: (response) => {
          console.log('Student deleted successfully');
          // let index: number = this.users.indexOf(student);
          // this.users.splice(index, 1);
          // console.log(index);
          this.getStudents();
        },
        error: (err: AppError) => {
          console.log(err);
        },
      });
    }
  }
}

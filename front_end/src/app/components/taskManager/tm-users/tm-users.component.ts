import { TmViewProfileComponent } from './../tm-view-profile/tm-view-profile.component';
import { Router } from '@angular/router';
import { CommentComponent } from './../comment/comment.component';
import { TaskManagerService } from './../../../services/task-manager.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { AppError } from 'src/app/exceptions/AppError';
import { NotFoundError } from 'src/app/exceptions/not-found-error';
import { User } from 'src/app/interfaces/user';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-tm-users',
  templateUrl: './tm-users.component.html',
  styleUrls: ['./tm-users.component.css'],
})
export class TmUsersComponent implements OnInit {
  users!: User[];
  @Input('user') user!: User;
  updateUserForm!: FormGroup;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  element_data: User[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private taskManagerService: TaskManagerService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {
    this.getUsers();

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

  getUsers() {
    this.taskManagerService.getUsers().subscribe({
      next: (result) => (
        (this.users = result), this.dtTrigger.next(this.users)
      ),
      error: (err: AppError) => {
        if (err instanceof NotFoundError) {
          console.log(err);
        }
      },
    });
  }

  getUser(id: number) {
    this.taskManagerService.getUser(id).subscribe({
      next: (result) => (this.user = result),
      error: (err: AppError) => {
        if (err instanceof NotFoundError) {
          console.log(err);
        }
      },
    });
  }

  // comment() {
  //   this.dialog
  //     .open(CommentComponent, {
  //       width: '100%',
  //     })
  //     .afterClosed()
  //     .subscribe((val) => {
  //       if (val === 'Add') console.log();
  //     });
  // }


  viewProfile(user: User) {
    this.taskManagerService.setSelectedUser(user);
    this.dialog
      .open(TmViewProfileComponent, {
        width: '30%',
        data: user,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'Update') console.log();
      });
  }
}

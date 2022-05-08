import { Comment } from 'src/app/interfaces/Comment';
import { ViewCommentsComponent } from './../view-comments/view-comments.component';
import { TaskManagerService } from './../../../services/task-manager.service';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppError } from 'src/app/exceptions/AppError';
import { NotFoundError } from 'src/app/exceptions/not-found-error';
import { Teacher } from 'src/app/interfaces/Teacher';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { User } from 'src/app/interfaces/user';
import { BadInput } from 'src/app/exceptions/BadInput';
import { UiService } from 'src/app/services/ui.service';
import { CommentComponent } from '../comment/comment.component';

@Component({
  selector: 'app-tm-view-profile',
  templateUrl: './tm-view-profile.component.html',
  styleUrls: ['./tm-view-profile.component.css'],
})
export class TmViewProfileComponent implements OnInit {
  actionBtn: string = 'Add';
  isToggled: boolean = false;
  showPassword: string = 'password';
  userForm!: FormGroup;
  @Input('teacher') teacher!: Teacher;
  user!: User;
  selectedUser = this.taskManagerService.selectedUser;
  currentUser!: User;
  comments!: Comment[];
  id!: number;

  constructor(
    private uiService: UiService,
    private adminService: AdminService,
    private taskManagerService: TaskManagerService,
    private dialogRef: MatDialogRef<TmViewProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: User,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      first_name: new FormControl(),
      last_name: new FormControl(),
      username: new FormControl(),
      email: new FormControl(),
      birthday: new FormControl(),
      phone: new FormControl(),
    });
    if (this.editData) {
      // this.actionBtn = 'Update';
      this.userForm.controls['first_name'].setValue(this.editData.first_name);
      this.userForm.controls['last_name'].setValue(this.editData.last_name);
      this.userForm.controls['username'].setValue(this.editData.username);
      this.userForm.controls['email'].setValue(this.editData.email);
      this.userForm.controls['birthday'].setValue(this.editData.birth_date);
      this.userForm.controls['phone'].setValue(this.editData.phone);
    }
    console.log(this.editData);
  }

  getCurrentUserInfo() {
    console.log('current user info');
    this.taskManagerService.getCurrentUserInfo().subscribe({
      next: (result) => (this.currentUser = result),
      error: (err: AppError) => {
        if (err instanceof NotFoundError) {
          console.log(err);
        }
      },
    });
  }

  allComments() {
    this.dialog
      .open(ViewCommentsComponent, {
        width: '100%',
        // data: this.comments,
        data : {
          comment : this.comments,
          id : this.editData.id
        }
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'Add') console.log();
      });
  }

  getComments() {
    this.taskManagerService
      .getComments(this.authService.getId(), this.editData.id || 0)
      .subscribe({
        next: (result) => (
          (console.log(result), this.comments = result, this.allComments())
        ),
        error: (err: AppError) => {
          if (err instanceof NotFoundError) {
            console.log(err);
          }
        },
      });
  }

  comment() {
    this.dialog
      .open(CommentComponent, {
        width: '100%',
        data: this.editData
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'Add') console.log();
      });
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

  get passwordStatus() {
    return this.userForm.get('passwordStatus');
  }

  getUser(id: number) {
    this.taskManagerService.getUser(id).subscribe({
      next: (response) => (
        this.userForm.controls['first_name'].setValue(response.first_name),
        this.userForm.controls['last_name'].setValue(response.last_name),
        this.userForm.controls['email'].setValue(response.email),
        this.userForm.controls['password'].setValue(response.password),
        this.userForm.controls['birth_date'].setValue(response.birth_date),
        this.userForm.controls['phone'].setValue(response.phone)
      ),
      error: (err: AppError) => {
        if (err instanceof NotFoundError) {
          console.log(err);
        }
      },
    });
  }
}

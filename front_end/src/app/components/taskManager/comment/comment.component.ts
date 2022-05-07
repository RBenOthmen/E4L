import { UiService } from './../../../services/ui.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotFoundError } from 'rxjs/internal/util/NotFoundError';
import { AppError } from 'src/app/exceptions/AppError';
import { Comment } from 'src/app/interfaces/Comment';
import { TaskManagerService } from 'src/app/services/task-manager.service';
import { User } from 'src/app/interfaces/user';
import { BadInput } from 'src/app/exceptions/BadInput';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  commentForm!: FormGroup;
  comments!: Comment[];
  user!: User;
  currentUser!: User;
  selectedUser!: User;

  constructor(
    private taskManagerService: TaskManagerService,
    private uiService: UiService,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public editData: User
  ) {
    this.selectedUser = taskManagerService.selectedUser;
  }

  ngOnInit(): void {
    this.commentForm = new FormGroup({
      comment: new FormControl(null, Validators.required),
    });

    // this.getUser(id);
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

  getCurrentUserInfo() {
    this.taskManagerService.getCurrentUserInfo().subscribe({
      next: (result) => (this.currentUser = result),
      error: (err: AppError) => {
        if (err instanceof NotFoundError) {
          console.log(err);
        }
      },
    })
  }

  addComment() {
    console.log('comment: ' + this.comment?.value);
    this.taskManagerService.createComment(this.authService.getId(), this.editData.id || 0, this.comment?.value).subscribe({
      next: (result) => {
        this.commentForm.reset();
        this.uiService.toastSuccess('Comment has been created successfuly');
      },
      error: (err: AppError) => {
        if (err instanceof BadInput) {
          console.log(err);
          this.uiService.toastError('Bad input');
        } else {
          this.uiService.toastError('Server error');
        }
      },
    });
  }

  get comment() {
    return this.commentForm.get('comment');
  }
}

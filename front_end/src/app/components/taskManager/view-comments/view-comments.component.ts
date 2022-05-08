import { UiService } from 'src/app/services/ui.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotFoundError } from 'rxjs/internal/util/NotFoundError';
import { AppError } from 'src/app/exceptions/AppError';
import { Comment } from 'src/app/interfaces/Comment';
import { TaskManagerService } from 'src/app/services/task-manager.service';
import { User } from 'src/app/interfaces/user';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BadInput } from 'src/app/exceptions/BadInput';

@Component({
  selector: 'app-view-comments',
  templateUrl: './view-comments.component.html',
  styleUrls: ['./view-comments.component.css'],
})
export class ViewCommentsComponent implements OnInit {
  commentForm!: FormGroup;
  comments!: Comment[];
  user!: User;
  currentUser!: User;
  selectedUser!: User;

  constructor(
    private taskManagerService: TaskManagerService,
    private uiService: UiService,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {
    this.selectedUser = taskManagerService.selectedUser;
    this.comments = editData.comment;
    console.log("editData: ");
    console.log(editData);
    console.log(editData.comment);

  }

  ngOnInit(): void {
    this.commentForm = new FormGroup({
      comment: new FormControl(null, Validators.required),
    });
    // this.commentForm.get('comment')?.setValue('comments...');
    console.log("comments: ");
    console.log(this.comments);
    // this.comments = this.taskManagerService.getAllComments();
  }

  get comment() {
    return this.commentForm.get('comment');
  }

  updateComment(comment: Comment, newComment: string) {
    console.log(comment.comment);
    console.log('comment: ' + this.comment?.value);
    this.taskManagerService.updateComment(this.authService.getId(), this.editData.id || 0, newComment, comment.id).subscribe({
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

  deleteComment(comment: Comment) {
    console.log(comment.comment);
    console.log('comment: ' + this.comment?.value);
    this.taskManagerService.deleteComment(comment.id).subscribe({
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

}

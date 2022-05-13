import { CommentDetailsComponent } from './../../comment-details/comment-details.component';
import { AdminService } from 'src/app/services/admin.service';
import { UiService } from 'src/app/services/ui.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotFoundError } from 'rxjs/internal/util/NotFoundError';
import { AppError } from 'src/app/exceptions/AppError';
import { Comment } from 'src/app/interfaces/Comment';
import { TaskManagerService } from 'src/app/services/task-manager.service';
import { User } from 'src/app/interfaces/user';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BadInput } from 'src/app/exceptions/BadInput';

@Component({
  selector: 'app-user-comments',
  templateUrl: './user-comments.component.html',
  styleUrls: ['./user-comments.component.css'],
})
export class UserCommentsComponent implements OnInit {
  commentForm!: FormGroup;
  comments!: Comment[];
  commentaire!: Comment;
  user!: User;
  currentUser!: User;
  selectedUser!: User;
  commentState!: boolean;
  color: string = 'primary';
  btnValue: string = 'Hello';
  state!: boolean;


  constructor(
    private uiService: UiService,
    private adminService: AdminService,
    private taskManagerService: TaskManagerService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {
    this.selectedUser = taskManagerService.selectedUser;
    this.comments = editData.comment;
  }

  ngOnInit(): void {
    this.commentForm = new FormGroup({
      comment: new FormControl(null, Validators.required),
    });
    this.state = this.editData.comment.state;
  }

  get comment() {
    return this.commentForm.get('comment');
  }

  changeState(comment: Comment) {
    this.toggleState(comment.state);
    let index = this.comments.indexOf(comment);

    console.log("pre comment");
    console.log(this.comments[index]);

    this.comments[index].state = !comment.state;
    this.adminService.modifyCommentState(comment.id, comment.state).subscribe({
      next: (result) => {
        this.commentForm.reset();
        // this.uiService.toastSuccess('Comment has been updated successfuly');
        console.log(result)
      },
      error: (err: AppError) => {
        let index = this.comments.indexOf(comment);
        this.comments[index].state = !comment.state;
        if (err instanceof BadInput) {
          this.toggleState(comment.state);
          console.log(err);
          this.uiService.toastError('Bad input');
        } else {
          this.uiService.toastError('Server error');
        }
      },
    });

    console.log("post comment");
    console.log(this.comments[index]);
  }

  toggleState(state: boolean) {
    state = !state;
    if (state == true) {
      this.color = 'basic';
      this.btnValue = 'Mark as unread'
    }
    else {
      this.color = 'primary';
      this.btnValue = 'Mark as read'
    }
    this.state = state;
  }

  getComment() {
    this.dialog.open(CommentDetailsComponent, {
      width: '30%',
      data: {
        comment: this.comments
      }
    })
    .afterClosed().subscribe((val) => {
      if (val === 'Add') console.log();
    });
  }

  // commentDetails(comment: Comment) {
  //   this.adminService
  //     .getComment(comment.id)
  //     .subscribe({
  //       next: (result) => (
  //         (console.log(result), this.getComment())
  //       ),
  //       error: (err: AppError) => {
  //         if (err instanceof NotFoundError) {
  //           console.log(err);
  //         }
  //       },
  //     });
  // }


}


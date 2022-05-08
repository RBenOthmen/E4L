import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Comment } from 'src/app/interfaces/Comment';

@Component({
  selector: 'app-comment-details',
  templateUrl: './comment-details.component.html',
  styleUrls: ['./comment-details.component.css']
})
export class CommentDetailsComponent implements OnInit {

  commentDetailsForm!: FormGroup;
  comment!: Comment;

  constructor(@Inject(MAT_DIALOG_DATA) public editData: any) {
    this.comment = editData.comment;
    console.log("this.comment");
    console.log(this.comment);
  }

  ngOnInit(): void {
  }

}

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css'],
})
export class ConfirmComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: string
  ) {}

  public confirmMessage!: string;

  ngOnInit(): void {
    this.confirmMessage = this.editData;
  }

  ok() {
    this.dialogRef.close('Ok');
  }
}

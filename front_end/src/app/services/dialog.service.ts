import { ConfirmComponent } from './../components/dialogs/confirm/confirm.component';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  confirmDialog() {
    this.dialog.open(ConfirmComponent);
  }


}

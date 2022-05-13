import { ConfirmComponent } from './../components/dialogs/confirm/confirm.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DialogService } from '../services/dialog.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  lang!: string;
  dialogRef!: MatDialogRef<ConfirmComponent>;

  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    /*this.route.paramMap
    .subscribe(params => {
      console.log(params)
      let route : string | null = params.get('id');
      console.log(route)
    });*/
    this.lang = localStorage.getItem('lang') || 'en';
  }

  logout() {
    this.dialog
      .open(ConfirmComponent, {
        width: '40%',
        data: 'Are you sure you want to log out?',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'Ok') {
          this.authService.logout();
          this.router.navigate(['login']);
        }
      });
    // this.dialogService.confirmDialog();
    // this.dialogRef = this.dialog.open(ConfirmComponent, {
    //   disableClose: false,
    // });
    // this.dialogRef.componentInstance.confirmMessage =
    //   'Are you sure you want to log out?';

    // this.dialogRef.afterClosed().subscribe((result) => {
    //   if (result) {
    //     console.log('logout success!');
    //   }
    // });
  }

  changeLang(lang: any) {
    console.log(lang.target.value);
    let language = lang.target.value;
    localStorage.setItem('lang', language);
    window.location.reload();
  }
}

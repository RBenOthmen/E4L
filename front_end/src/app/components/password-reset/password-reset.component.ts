import { UiService } from './../../services/ui.service';
import { BadInput } from 'src/app/exceptions/BadInput';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';
import { AppError } from 'src/app/exceptions/AppError';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  emailForm!: FormGroup;
  constructor(private router : Router,
    private authService : AuthService,
    private uiService : UiService) { }

  goToSignup() {
    this.router.navigate(['/signup'])
  }

  ngOnInit(): void {
    this.emailForm = new FormGroup({
      "email": new FormControl(null, [Validators.required, Validators.email]),
    })
  }

  get email() {
    return this.emailForm.get('email');
  }


  onChangePassword() {
    this.authService.resetPassword(this.email?.value).subscribe(
      {
        next : response => {
          this.uiService.toastSuccess('Email has been sent');
          this.router.navigate(['/login']);
        }
        ,error : (err : AppError) => {
          if (err instanceof BadInput) {
            this.uiService.toastError('Invalid Email');
        } else {
          this.uiService.toastServerDown();
        }
       }
      });
  }

}

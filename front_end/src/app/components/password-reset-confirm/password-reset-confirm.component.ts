import { UiService } from './../../services/ui.service';
import { BadInput } from 'src/app/exceptions/BadInput';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AppError } from 'src/app/exceptions/AppError';

@Component({
  selector: 'app-password-reset-confirm',
  templateUrl: './password-reset-confirm.component.html',
  styleUrls: ['./password-reset-confirm.component.css']
})
export class PasswordResetConfirmComponent implements OnInit {
  uid!:string;
  token!:string;
  passwordForm!: FormGroup;
  constructor(private  route : ActivatedRoute,
    private authService : AuthService,
    private router :Router,
    private uiService : UiService) { }

  ngOnInit(): void {

    this.passwordForm = new FormGroup({
      "password": new FormControl(null, [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
      "re_password": new FormControl(null, [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
    });
      
  }

  get password() {
    return this.passwordForm.get('password');
  }

  get re_password() {
    return this.passwordForm.get('re_password');
  }

  onChangePassword() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.uid = <string>params.get('uid')
    })
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.token = <string>params.get('token')
    });

    if (this.password?.value == '' || this.re_password?.value=='') {
      this.uiService.toastError("Please enter a valid password");
    }else if (this.password?.value == this.re_password?.value) {
      this.authService.resetPasswordConfirm(this.uid, this.token, this.password?.value, this.re_password?.value).subscribe(
        {
          next : response => {
            this.uiService.toastSuccess('Password has changed successfuly')
            this.router.navigate(['/login']);
          }
          ,error : (err : AppError) => {
            if (err instanceof BadInput) {
              this.uiService.toastError('Invalid recovery link');
          } else {
            this.uiService.toastServerDown();
          }
         }
        });
    } else if (this.password?.value != this.re_password?.value){
      this.uiService.toastError("Passwords dosn't match");
    }
  }

}

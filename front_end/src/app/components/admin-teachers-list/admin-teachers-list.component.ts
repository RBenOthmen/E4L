import { GeoService } from './../../services/geo.service';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppError } from 'src/app/exceptions/AppError';
import { Teacher } from 'src/app/interfaces/Teacher';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/interfaces/user';
import { BadInput } from 'src/app/exceptions/BadInput';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-admin-teachers-list',
  templateUrl: './admin-teachers-list.component.html',
  styleUrls: ['./admin-teachers-list.component.css'],
})
export class AdminTeachersListComponent implements OnInit {

  private day: number | undefined;
  private month: number | undefined;
  private year: number | undefined;
  private isValidDate: boolean | undefined;

  actionBtn: string = 'Add';
  isToggled: boolean = false;
  showPassword: string = 'password';
  userForm!: FormGroup;
  @Input('teacher') teacher!: Teacher;
  minDate = new Date(1910, 1, 1);
  maxDate = new Date(2014, 1, 1);
  selectedCountryCode = 'us';
  countryCodes = ['us', 'ca', 'de', 'mx', 'br', 'pt', 'cn', 'be', 'jp', 'ph', 'lu', 'bs', 'tn'];
  phoneCode = '1';


  constructor(
    private userService: UserService,
    private authService: AuthService,
    private uiService: UiService,
    private adminService: AdminService,
    @Inject(MAT_DIALOG_DATA) public editData: User,
    private dialogRef: MatDialogRef<AdminTeachersListComponent>,
    private geoService: GeoService
  ) {}

  ngOnInit(): void {
    this.userForm = new FormGroup({

      first_name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('([a-zA-Z ]+)'),
      ]),
      last_name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('([a-zA-Z ]+)'),
      ]),
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('(^[a-zA-Z ]+[0-9]*)'),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
        ),
      ]),
      // "birthday": new FormControl(null, [Validators.required, Validators.pattern('[0-9]{4}-[0-9]{2}-[0-9]{2}')]),
      birthday: new FormControl(null, Validators.required),
      phone: new FormControl(null, [
        Validators.required,
        Validators.min(10000000),
        Validators.max(99999999),
      ]),
      role: new FormControl(null, Validators.required),
      linkedIn: new FormControl(null, Validators.required),
    });

    if (this.editData) {
      this.actionBtn = 'Update';
      this.userForm.controls['first_name'].setValue(this.editData.first_name);
      this.userForm.controls['last_name'].setValue(this.editData.last_name);
      this.userForm.controls['username'].setValue(this.editData.username);
      this.userForm.controls['email'].setValue(this.editData.email);
      this.userForm.controls['birthday'].setValue(this.editData.birth_date);
      this.userForm.controls['phone'].setValue(this.editData.phone);
      // this.userForm.controls["user"].setValue(this.editData.first_name);
    }
  }

  togglePassword() {
    if (this.showPassword == 'password') this.showPassword = 'text';
    else if (this.showPassword == 'text') this.showPassword = 'password';
  }

  onClick() {
    if (!this.editData) this.addUser();
    else if (this.editData) this.updateUser();
  }

  addUser() {
    let user: User = this.getUser();
    user.role = 'S';

    this.adminService.CreateUser(user).subscribe({
      next: (response) => {
        this.userForm.reset();
        this.uiService.toastSuccess('Account has been created successfuly');
        // this.activateUser(response);
        this.dialogRef.close('add');
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

  updateUser() {
    let user: User = this.getUser();

    user.id = this.editData.id;
    user.role = this.editData.role;

    this.adminService.updateUser(user).subscribe({
      next: (response) => {
        this.userForm.reset();
        this.uiService.toastSuccess('Account has been updated successfuly');
        // this.activateUser(response);
        this.dialogRef.close('save');
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

  activateUser(user: User) {
    this.adminService.activateUser(user).subscribe({
      next: (response) => {
        this.uiService.toastSuccess('Account has been created successfuly');
      },
      error: (err: AppError) => {
        this.uiService.toastError(
          'Account has been created without being activated'
        );
      },
    });
  }

  getUser(): User {
    return {
      first_name: this.first_name?.value,
      last_name: this.last_name?.value,
      email: this.email?.value,
      password: this.password?.value,
      username: this.username?.value,
      phone: this.phone?.value,
      birth_date: this.birthday?.value,
      type: this.role?.value,
    };
  }

  dateValidator(date: Date): boolean {
    this.day = date.getDate();
    this.month = date.getMonth() + 1;
    this.year = date.getFullYear();

    this.isValidDate =
      this.day in [1, 31] && this.month in [1, 12] && this.year in [1920, 2014];
    console.log(this.isValidDate);
    console.log(this.day + '/' + this.month + '/' + this.year);
    return this.isValidDate;
  }

  get dateInput() {
    return this.isValidDate;
  }

  changeSelectedCountryCode(value: string): void {
    this.selectedCountryCode = value;
    this.phoneCode = this.geoService.findCountryCodeByTwoLetterAbbreviation(
      this.selectedCountryCode
    );
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

  get linkedIn() {
    return this.userForm.get('linkedIn');
  }

  get passwordStatus() {
    return this.userForm.get('passwordStatus');
  }

  get role() {
    return this.userForm.get('role');
  }
  // end getters
}

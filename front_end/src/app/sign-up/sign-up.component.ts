import { LoaderService } from './../services/loader.service';
import { UiService } from './../services/ui.service';
import { PhoneService } from './../services/phone.service';
import { Phone } from './../interfaces/Phone';
import { GeoService } from './../services/geo.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { BadInput } from '../exceptions/BadInput';
import { AppError } from '../exceptions/AppError';
import { formatDate } from '@angular/common';
import { Teacher } from '../interfaces/Teacher';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  phoneType: string = 'HOME';
  selectedCountryCode = 'tn';
  phoneCode = '216';
  // countryCodes = ['us', 'ca', 'de', 'mx', 'br', 'pt', 'cn', 'be', 'jp', 'ph', 'lu', 'bs', 'tn','fr'];
  countryCodes = ['tn'];


  // isToggled: boolean = false;
  showPassword: string = 'password';
  registerForm!: FormGroup;
  invalidSignup: boolean = false;
  serverOffline: boolean = false;
  minDate = new Date(1910, 1, 1);
  maxDate = new Date(2014, 1, 1);
  submitted = false;
  digits: number = 8;
  isPhoneNumber!: boolean;

  videoToUpload !:any;
  videoToDisplay !: any;
  imageToDisplay : any = '../../assets/images/user-icon.png';
  fileToUpload!: any;
  uploading = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private geoService: GeoService,
    private phoneService: PhoneService,
    private uiService : UiService,
    private loaderService :LoaderService,
  ) {
    loaderService.hideLoader();
  }

  goToSignin() {
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
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
        Validators.minLength(8),
        Validators.pattern('^[2,5,9]+[0-9]*'),
        Validators.maxLength(8),
      ]),
      user: new FormControl(null, Validators.required),
      linkedIn: new FormControl(null, Validators.required),
      phonenumber: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(8),
        Validators.maxLength(10),
      ]),
    });
  }

  handleVideoInput(vid :any) {
    let video = vid.target.files[0];
    console.log(video)
    this.videoToUpload = video;
    // image.item(0)
    console.log(this.videoToUpload.type)
    //show image preview here
    var reader = new FileReader();
    reader.readAsDataURL(this.videoToUpload);
    reader.onload = (event : any) => {
      this.videoToDisplay = event.target.result;
    }

  }
  
  handleFileInput(img :any) {
    let image = img.target.files[0];
    console.log(image)
    this.fileToUpload = image;
    // image.item(0)
    console.log(this.fileToUpload.type)
    //show image preview here
    var reader = new FileReader();
    reader.readAsDataURL(this.fileToUpload);
    reader.onload = (event : any) => {
      this.imageToDisplay = event.target.result;
    }
  }

  changeSelectedCountryCode(value: string): void {
    this.selectedCountryCode = value;
    this.phoneCode = this.geoService.findCountryCodeByTwoLetterAbbreviation(
      this.selectedCountryCode
    );
  }


  keyPress(phone: any) {
    if (this.phone?.value.toString().length != this.getAllowedPhoneDigits()) {
      this.isPhoneNumber = false;
      // this.phone?.markAsDirty
    } else this.isPhoneNumber = true;

    console.log(this.isPhoneNumber);
  }

  getAllowedPhoneDigits() {
    if (this.selectedCountryCode == 'tn') {
      return 8;
    } else if (this.selectedCountryCode == 'us') {
      return 10;
    } else if (this.selectedCountryCode == 'fr') {
      return 9;
    }

    return 0;
  }

  private day: number | undefined;
  private month: number | undefined;
  private year: number | undefined;
  private isValidDate: boolean | undefined;
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

  // begin getters
  get first_name() {
    return this.registerForm.get('first_name');
  }

  get last_name() {
    return this.registerForm.get('last_name');
  }

  get username() {
    return this.registerForm.get('username');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get birthday() {
    return this.registerForm.get('birthday');
  }

  get phone() {
    return this.registerForm.get('phone');
  }

  get passwordStatus() {
    return this.registerForm.get('passwordStatus');
  }

  get user() {
    return this.registerForm.get('user');
  }

  get phonenumber() {
    return this.registerForm.get('phonenumber');
  }

  get linkedIn() {
    return this.registerForm.get('linkedIn');
  }


  checkPassword(password: string,username: string,firstname: string,lastname : string) {

    if (password.indexOf(lastname) != -1 || password.indexOf(firstname) != -1 || password.indexOf(username) != -1) {
      return false;
    }
    console.log('password')

    return true;
  }

  togglePassword() {
    if (this.showPassword == 'password') this.showPassword = 'text';
    else if (this.showPassword == 'text') this.showPassword = 'password';
  }

  register() {

    this.uploading = true;
    let phone : Phone= {
      number : this.phone?.value,
      country_code : this.selectedCountryCode
    }

    let user: User = this.getUser();
    console.log(this.checkPassword(user.password || '',user.username || '',user.first_name || '',user.last_name || ''))
    if (this.checkPassword(user.password || '',user.username || '',user.first_name || '',user.last_name || '') == true) {
      this.phoneService.createPhone(phone).subscribe({
        next: (response) => {
          this.signup(response.id || 0);
        },
        error: (err: AppError) => {
          this.uploading = false;
          if (err instanceof BadInput) {
            console.log(err);
            this.invalidSignup = true;
          } else {
            this.serverOffline = true;
          }
        },
      });
    } else {
      this.uploading = false;
      this.uiService.toastError("Password is similar to username/firstname/lastname");
      // this.uiService.toastError("passwordSimilar");
      
    }
  }

  signup(phone_id :number) {
    let user: User = this.getUser();
    user.phone_id = phone_id;

    this.authService.signup(user).subscribe({
      next: (response) => {
        if (user.role == 'T') {
          this.createTeacher(response.id || 0);
        } else {
          this.uploading = false;
          this.router.navigate(['/login']);
          this.uiService.toastSuccess("Please confirm your email")
        }
      },
      error: (err: AppError) => {
        this.uploading = false;
        if (err instanceof BadInput) {
          console.log(err);
          this.invalidSignup = true;
        } else {
          this.serverOffline = true;
        }
      },
    });
  }



  createTeacher(id : number) {
    let teacher : Teacher = {
      user_id : id,
      linkedIn: this.linkedIn?.value,
    }
    this.authService.createTeacher(teacher).subscribe({
      next: (response) => {
        this.createUserVideo(response.id || 0)
        this.uploading = false;
        this.registerForm.reset();
        this.router.navigate(['/login']);
        this.uiService.toastSuccess("Please confirm your email")
      },
      error: (err: AppError) => {
        this.uploading = false;
        console.log(err)
        if (err instanceof BadInput) {
          console.log(err);
          this.invalidSignup = true;
        } else {
          this.serverOffline = true;
        }
      },
    });
  }

  createUserVideo(id : number) : void {
    this.authService.createUserVideo(this.videoToUpload, id).subscribe({
      next : response => {
        console.log("file update success")
      },
        error : (err : AppError) => {
          console.log(err)
       }
    });
  }

  getUser(): User {
    let date = formatDate(new Date(this.birthday?.value), 'yyyy/MM/dd', 'en');
    let newdate: Date = <Date>(
      (<unknown>(
        (date[0] +
          date[1] +
          date[2] +
          date[3] +
          '-' +
          date[5] +
          date[6] +
          '-' +
          date[8] +
          date[9])
      ))
    );
    return {
      first_name: this.first_name?.value,
      last_name: this.last_name?.value,
      email: this.email?.value,
      password: this.password?.value,
      username: this.username?.value,
      phone: this.phone?.value,
      birth_date: newdate,
      type: this.user?.value,
    };
  }
}

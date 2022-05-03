import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Event, Router } from '@angular/router';
import { AppError } from 'src/app/exceptions/AppError';
import { BadInput } from 'src/app/exceptions/BadInput';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { GeoService } from 'src/app/services/geo.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent implements OnInit {
  phoneType: string = 'HOME'
  selectedCountryCode = 'us';
  phoneCode = '1';
  countryCodes = ['us', 'ca', 'de', 'mx', 'br', 'pt', 'cn', 'be', 'jp', 'ph', 'lu', 'bs', 'tn'];
  
  imageUrl = '../../assets/images/user-icon.png';
  fileToUpload!: any;
  profileForm!: FormGroup;
  usernameForm!: FormGroup;
  passwordForm!: FormGroup;
  minDate = new Date(1910, 1, 1);
  maxDate = new Date(2014, 1, 1);
  hide = true;

  currentUser : User = {
  }

  constructor(public authService : AuthService,
    private router :Router,
    private geoService : GeoService) {
  }


  ngOnInit(): void {
    this.profileForm = new FormGroup({
      "first_name": new FormControl(null, [Validators.required, Validators.minLength(4)]),
      "last_name": new FormControl(null, [Validators.required, Validators.minLength(4)]),
      "email": new FormControl(null, [Validators.required, Validators.email]),
      "birthday": new FormControl(null, Validators.required),
      "phone": new FormControl(null, [Validators.required, Validators.min(10000000), Validators.max(99999999)]),
    });

    this.passwordForm = new FormGroup({
      "currentPassword": new FormControl(null, [Validators.required, Validators.minLength(4)]),
      "newPassword": new FormControl(null, [Validators.required, Validators.minLength(4)]),
      "confirmPassword": new FormControl(null, [Validators.required, Validators.minLength(4)]),
     
    });

    this.usernameForm = new FormGroup({
      "usernamePassword": new FormControl(null, [Validators.required, Validators.minLength(4)]),
      "username": new FormControl(null, [Validators.required, Validators.minLength(3), Validators.pattern('(^[a-zA-Z ]+[0-9]*)')]),
     
    });

    
    

    this.authService.getUserDetails()
    .subscribe(
      response => {
        this.currentUser.email = response.email;
        this.currentUser.username = response.username;
        this.currentUser.first_name = response.first_name;
        this.currentUser.last_name = response.last_name;
        this.currentUser.password = response.password;
        this.currentUser.birth_date = response.birth_date;
        this.currentUser.phone = response.phone;
        console.log(response)
        this.profileForm.controls["first_name"].setValue(response.first_name);
        this.profileForm.controls["last_name"].setValue(response.last_name);
        this.profileForm.controls["email"].setValue(response.email);
        this.profileForm.controls["birthday"].setValue(response.birth_date);
        this.profileForm.controls["phone"].setValue(response.phone);
        this.usernameForm.controls["username"].setValue(response.username);
      }
    );
    console.log(this.authService.currentUser.first_name)
    document.getElementById('first_name')?.setAttribute(<string>this.authService.currentUser.first_name, '');
    // document.getElementById("first_name").innerHTML = <string>this.authService.currentUser.first_name;
  }

  changeSelectedCountryCode(value: string): void {
    this.selectedCountryCode = value;
    this.phoneCode = this.geoService.findCountryCodeByTwoLetterAbbreviation(this.selectedCountryCode);
  }

  handleFileInput(img :any) {
    let image = img.target.files[0];
    this.fileToUpload = image;
    // image.item(0)
    console.log(this.fileToUpload.type)
    //show image preview here
    var reader = new FileReader();
    reader.readAsDataURL(this.fileToUpload);
    reader.onload = (event : any) => {
      this.imageUrl = event.target.result;
    }

  }

  isEmpty(word: any): boolean {
    if (word.valueOf().length == 0) {
      return true;
    } else {
      return false;
    }
  }

  updatePassword() : void {
    if (this.newPassword?.value == this.confirmPassword?.value) {
      this.authService.changePassword({
        current_password : this.currentPassword?.value,
        new_password : this.newPassword?.value,
      }).subscribe({
        next : response => {
          console.log("password success");
        },
          error : (err : AppError) => {
            console.log(err);
         }
     });
    }
    
  }

  updateUsername() : void {
    
    console.log("username value" + this.username?.value)
    this.authService.changeUsername({
      current_password : this.currentPassword?.value,
      new_username : this.username?.value,
    }).subscribe({
      next : response => {
        console.log("username success")
      },
        error : (err : AppError) => {
          console.log(err)
       }
   });
  }

  updateUser(data : any) : void {
    let user : User = {
      first_name : this.first_name?.value,
      last_name : this.last_name?.value,
      email : this.email?.value,
      birth_date : this.birthday?.value,
      phone : this.email?.value,
      image : this.fileToUpload,
    };
    this.authService.updateUser(data).subscribe({
      next : response => {
        console.log("update success")
      },
        error : (err : AppError) => {
          console.log(err)
       }
    });
  }

  updateUserImage(data : any) : void {
    this.authService.updateUserImage(data).subscribe({
      next : response => {
        console.log("file update success")
      },
        error : (err : AppError) => {
          console.log(err)
       }
    });
  }

  save() {
    // document.getElementById("first_name").innerHTML = <string>this.authService.currentUser.first_name;
    console.log(this.authService.currentUser.first_name)

    this.updateUserImage(this.fileToUpload);

    if (this.email?.value != this.currentUser.email) {
      this.updateUser({email : this.email?.value});
    }

    if (this.first_name?.value !== this.currentUser.first_name) {
      this.updateUser({first_name : this.first_name?.value});
    }

    if (this.last_name?.value !== this.currentUser.last_name) {
      this.updateUser({last_name : this.last_name?.value});
    }

    if (this.phone?.value !== this.currentUser.phone) {
      this.updateUser({phone : this.phone?.value});
    }

    if (this.birthday?.value !== this.currentUser.birth_date) {
      this.updateUser({birth_date : this.birthday?.value});
    }



    // if (this.email?.value !== this.currentUser.email ||
    //   this.first_name?.value !== this.currentUser.first_name ||
    //   this.last_name?.value !== this.currentUser.last_name ||
    //   this.phone?.value !== this.currentUser.phone ||
    //   this.birthday?.value !== this.currentUser.birth_date) {
    //   if (!!this.currentPassword?.value) {
    //     console.log(this.email?.value)
    //     console.log(this.currentUser.email)
    //     console.log(this.email?.value != this.currentUser.email)
    //     this.updateUser()
    //   }
    // }

  }



  get first_name() {
    return this.profileForm.get('first_name');
  }

  get last_name() {
    return this.profileForm.get('last_name');
  }
  
  get email() {
    return this.profileForm.get('email');
  }

  get phone() {
    return this.profileForm.get('phone');
  }

  get birthday() {
    return this.profileForm.get('birthday');
  }

  get username() {
    return this.usernameForm.get('username');
  }

  get usernamePassword() {
    return this.usernameForm.get('usernamePassword');
  }

  get currentPassword() {
    return this.passwordForm.get('currentPassword');
  }

  get newPassword() {
    return this.passwordForm.get('newPassword');
  }

  get confirmPassword() {
    return this.passwordForm.get('confirmPassword');
  }



  


  private day: number| undefined;
  private month: number| undefined;
  private year: number| undefined;
  private isValidDate: boolean| undefined;
  dateValidator(date: Date): boolean{
    this.day = date.getDate();
    this.month = date.getMonth() + 1;
    this.year = date.getFullYear();

    this.isValidDate = this.day in [1, 31] && this.month in [1, 12] && this.year in [1920, 2014];
    console.log(this.isValidDate);
    console.log(this.day + "/" + this.month + "/" + this.year);
    return this.isValidDate;
  }

  get dateInput() {
    return this.isValidDate;
  }
}

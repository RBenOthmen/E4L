import { LoaderService } from './../../services/loader.service';
import { UiService } from './../../services/ui.service';
import { Phone } from './../../interfaces/Phone';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Event, Router } from '@angular/router';
import { AppError } from 'src/app/exceptions/AppError';
import { BadInput } from 'src/app/exceptions/BadInput';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { GeoService } from 'src/app/services/geo.service';
import { ConfirmComponent } from '../dialogs/confirm/confirm.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent implements OnInit {
  phoneType: string = 'HOME'
  selectedCountryCode = 'tn';
  phoneCode = '216';
  countryCodes = ['tn'];
  
  videoToUpload !:any;
  videoToDisplay !: any;
  imageToDisplay !: any;
  fileToUpload!: any;
  profileForm!: FormGroup;
  usernameForm!: FormGroup;
  passwordForm!: FormGroup;
  minDate = new Date(1910, 1, 1);
  maxDate = new Date(2014, 1, 1);
  hide = true;

  imageIsUploading : boolean = false;
  uploading : boolean = false;

  currentUser : User = {
  }
  isImageLoading!: boolean;

  constructor(public authService : AuthService,
    private router :Router,
    private geoService : GeoService,
    private dialog: MatDialog,
    private uiService : UiService,
    private loaderService : LoaderService) {
  }


  ngOnInit(): void {
    this.loaderService.hideLoader();
    this.profileForm = new FormGroup({
      "first_name": new FormControl(null, [Validators.required, Validators.minLength(4)]),
      "last_name": new FormControl(null, [Validators.required, Validators.minLength(4)]),
      "email": new FormControl(null, [Validators.required, Validators.email]),
      "birthday": new FormControl(null, Validators.required),
      "phone": new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^[2,5,9]+[0-9]*'),
        Validators.maxLength(8),
      ]),
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
        this.currentUser.birth_date = response.birth_date;
        this.currentUser.phone = response.phone;
        this.currentUser.phone_id = response.phone_id;
        console.log(response.image)
        this.imageToDisplay = response.image;
        this.profileForm.controls["first_name"].setValue(response.first_name);
        this.profileForm.controls["last_name"].setValue(response.last_name);
        this.profileForm.controls["email"].setValue(response.email);
        this.profileForm.controls["birthday"].setValue(response.birth_date);
        this.profileForm.controls["phone"].setValue(response.phone?.number);
        this.selectedCountryCode = response.phone?.country_code || 'us';
        this.changeSelectedCountryCode(this.selectedCountryCode);
        this.usernameForm.controls["username"].setValue(response.username);
      }
    );
    // console.log(this.authService.currentUser.first_name)
    // document.getElementById('first_name')?.setAttribute(<string>this.authService.currentUser.first_name, '');
    // document.getElementById("first_name").innerHTML = <string>this.authService.currentUser.first_name;
    this.authService.getCurrentTeacherInfo()
    .subscribe({
      next : response => {
        console.log('http://localhost:8000'+response.video)
        this.videoToDisplay ='http://localhost:8000'+ response.video;
      },
        error : (err : AppError) => {
          console.log(err);
       }
   })
  }

  changeSelectedCountryCode(value: string): void {
    this.selectedCountryCode = value;
    this.phoneCode = this.geoService.findCountryCodeByTwoLetterAbbreviation(this.selectedCountryCode);
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

//   imageToShow: any;

// createImageFromBlob(image: Blob) {
//    let reader = new FileReader();
//    reader.addEventListener("load", () => {
//       this.fileToUpload = reader.result;
//    }, false);

//    if (image) {
//       reader.readAsDataURL(image);
//    }
// }

// getImageFromService() {
//   this.isImageLoading = true;
//   this.authService.getImage().subscribe({
//     next : data => {
//       this.createImageFromBlob(data);
//       this.isImageLoading = false;
//     },
//       error : (err : AppError) => {
//         this.isImageLoading = false;
//         console.log(err);
//      }
//  });
  
// }

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

  updatePhone(phone : Phone) : void {
    console.log(this.currentUser.phone_id || 0)
    // console.log(this.currentUser.phone.id)
    this.authService.updatePhone(phone,this.currentUser.phone_id || 0).subscribe({
      next : response => {
        console.log("update success")
      },
        error : (err : AppError) => {
          console.log(err)
       }
    });
  }

  updateUser(data : any) : void {
    // let user : User = {
    //   first_name : this.first_name?.value,
    //   last_name : this.last_name?.value,
    //   email : this.email?.value,
    //   birth_date : this.birthday?.value,
    //   image : this.fileToUpload,
    // };
    this.authService.updateUser(data).subscribe({
      next : response => {
        console.log("update success")
        this.uploading = false;
      },
        error : (err : AppError) => {
          console.log(err)
          this.uploading = false;
       }
    });
  }

  updateUserImage() : void {
    this.imageIsUploading = true;
    this.authService.updateUserImage(this.fileToUpload).subscribe({
      next : response => {
        this.imageIsUploading = false;
        console.log("file update success")
      },
        error : (err : AppError) => {
          this.imageIsUploading = false;
          console.log(err)
       }
    });
  }

  updateUserVideo() : void {
    this.authService.updateUserVideo(this.videoToUpload).subscribe({
      next : response => {
        console.log("file update success")
      },
        error : (err : AppError) => {
          console.log(err)
       }
    });
  }

  save() {
    this.uploading = true;
    // document.getElementById("first_name").innerHTML = <string>this.authService.currentUser.first_name;
    console.log(this.authService.currentUser.first_name)

    console.log(this.phone?.value)

    // this.updateUserImage(this.fileToUpload);
    console.log(this.email?.value)

    let user : User = {
      email : this.currentUser.email,
      first_name : this.currentUser.first_name,
      last_name : this.currentUser.last_name,
      birth_date : this.currentUser.birth_date,
      phone_id : this.currentUser.phone_id
    }

    if (this.email?.value != this.currentUser.email) {
      // this.updateUser({email : this.email?.value});
      user.email = this.email?.value;
    }

    if (this.first_name?.value !== this.currentUser.first_name) {
      // this.updateUser({first_name : this.first_name?.value});
      user.first_name = this.first_name?.value;
    }

    console.log(this.last_name?.value !== this.currentUser.last_name)
    console.log(this.last_name?.value)
    console.log(this.currentUser.last_name)

    if (this.last_name?.value !== this.currentUser.last_name) {
      // this.updateUser({last_name : this.last_name?.value});
      user.last_name = this.last_name?.value;
      
    }

    if (this.birthday?.value !== this.currentUser.birth_date) {
      // this.updateUser({birth_date : this.birthday?.value});
      user.birth_date = this.birthday?.value;

    }

    if (this.phone?.value !== this.currentUser.phone?.number) {
      let phoneObject : Phone = {
        number : this.phone?.value,
        country_code : this.selectedCountryCode,
      }
      this.updatePhone(phoneObject);
    }

    console.log(user)

    this.updateUser(user)

  }

  deleteUser() {
    
    this.authService.deleteUser(this.authService.getId()).subscribe({
      next : response => {
        this.uiService.toastSuccess('This account deleted succesfully')
      },
        error : (err : AppError) => {
          console.log(err)
          this.uiService.toastError('Error, Try again ..')
       }
    });
  }

  delete() {
    this.dialog
      .open(ConfirmComponent, {
        width: '40%',
        data: 'Are you sure you want to delete this account?',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'Ok') {
          this.deleteUser();
        }
      });
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

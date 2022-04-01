import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';

import {FormControl, FormGroup, Validators} from "@angular/forms";


import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppError } from 'src/app/exceptions/AppError';
import { BadInput } from 'src/app/exceptions/BadInput';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  imageSrc: string = '';

  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  currentUser : User = {
  }

  constructor(public authService : AuthService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.authService.getUserDetails()
    .subscribe(
      response => {
        this.currentUser.email = response.email;
        this.currentUser.username = response.username;
        this.currentUser.first_name = response.first_name;
        this.currentUser.last_name = response.last_name;
      }
    )

  }
  modeView ='account';

  get f(){
    return this.myForm.controls;
  }

  onFileChange(event:any) {
    const reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.imageSrc = reader.result as string;

        this.myForm.patchValue({
          fileSource: reader.result
        });

      };
    }
  }

  get file() {
    return this.myForm.get('file');
  }

  private url = 'http://localhost:8000/';

  submit(){
    let token = localStorage.getItem('token');
    let authorization = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization' : 'JWT '+ token
      }),
    }
    let data : File = this.file?.value
    console.log(data.type);
    console.log(this.file?.value)

    return this.http.patch<User>(this.url+"auth/users/me/", {image:data}, authorization).subscribe(()=>{
      console.log("works")
    })
  }

}

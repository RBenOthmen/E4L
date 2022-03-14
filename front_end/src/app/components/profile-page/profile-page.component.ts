import {Component, OnInit} from '@angular/core';

import {FormControl, FormGroup, Validators} from "@angular/forms";


import { Router } from '@angular/router';
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
  ngOnInit(): void {
    
  }
  modeView ='account';
  

  
}

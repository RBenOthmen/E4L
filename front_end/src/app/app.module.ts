import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {HomeComponent} from './home/home.component';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {MenubarModule} from 'primeng/menubar';
import { MenuItem, MessageService } from 'primeng/api';
import {User} from "./models/User";
import {UserService} from "./services/user.service";
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SideBarComponent } from './side-bar/side-bar.component';
import { MatSliderModule } from '@angular/material/slider';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { CategoryItemComponent } from './components/category-item/category-item.component';
import { LessonItemComponent } from './components/lesson-item/lesson-item.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { AccountPageComponent } from './components/account-page/account-page.component';
import { PasswordComponent } from './formComponents/password/password.component';
import { TeacherListComponent } from './components/teacher-list/teacher-list.component';

import { UserItemComponent } from './components/user-item/user-item.component';
import { TeacherProfileComponent } from './components/teacher-profile/teacher-profile.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

import {CheckboxModule} from 'primeng/checkbox';
import {ButtonModule} from 'primeng/button';
import {PasswordModule} from 'primeng/password';
import {ToastModule} from 'primeng/toast';
import { ActivateEmailComponent } from './components/activate-email/activate-email.component';


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    HomeComponent,
    NavBarComponent,
    FooterComponent,
    SideBarComponent,
    CategoryItemComponent,
    LessonItemComponent,
    DashboardComponent,
    ProfilePageComponent,
    AccountPageComponent,
    PasswordComponent,
    UserItemComponent,
    TeacherListComponent,
    TeacherProfileComponent,
    SpinnerComponent,
    ActivateEmailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    MenubarModule,
    FontAwesomeModule,
    MatSliderModule,
    NoopAnimationsModule,
    MatIconModule,
    PasswordModule,
    CheckboxModule,
    ToastModule,
  ],
  providers: [
    UserService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

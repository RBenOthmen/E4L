import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {HomeComponent} from './home/home.component';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {ButtonModule} from 'primeng/button';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';
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
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

import { MatComponentsModule } from './modules/mat-components/mat-components.module';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClient, HttpClientModule} from '@angular/common/http';

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
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { UserItemComponent } from './components/user-item/user-item.component';
import { TeacherProfileComponent } from './components/teacher-profile/teacher-profile.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

import {CheckboxModule} from 'primeng/checkbox';
import {ButtonModule} from 'primeng/button';
import {PasswordModule} from 'primeng/password';
import {ToastModule} from 'primeng/toast';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';

import { ActivateEmailComponent } from './components/activate-email/activate-email.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { PasswordResetConfirmComponent } from './components/password-reset-confirm/password-reset-confirm.component';
import { AddTaskComponent } from './todolist/add-task/add-task.component';
import { TaskItemComponent } from './todolist/task-item/task-item.component';
import { TasksComponent } from './todolist/tasks/tasks.component';
import { MessengerComponent } from './Messenger/messenger/messenger.component';
import { MessengerWindowComponent } from './Messenger/messenger-window/messenger-window.component';
import { MessengerUserItemComponent } from './Messenger/messenger-user-item/messenger-user-item.component';
import { LanguageSelecteurComponent } from './components/language-selecteur/language-selecteur.component';

import {MatDialogModule} from '@angular/material/dialog';
import { AdminComponent } from './components/admin/admin.component';
import { AdminTeachersListComponent } from './components/admin-teachers-list/admin-teachers-list.component';
import { AdminStudentsComponent } from './components/admin-students/admin-students.component';
import { UserDetailsComponent } from './components/admin-components/user-details/user-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

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
    PasswordResetComponent,
    PasswordResetConfirmComponent,
    AddTaskComponent,
    TaskItemComponent,
    TasksComponent,
    MessengerComponent,
    MessengerWindowComponent,
    MessengerUserItemComponent,
    LanguageSelecteurComponent,

    AdminComponent,
    AdminTeachersListComponent,
    AdminStudentsComponent,
    UserDetailsComponent,



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
    MessagesModule,
    MessageModule,
    MatDialogModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
  BrowserAnimationsModule,
  MatComponentsModule,
  ],
  providers: [
    UserService,
    MessageService,
    HttpClient,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

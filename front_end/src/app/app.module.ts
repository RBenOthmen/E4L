import { ZoomService } from './Zoom/zoom.service';
import { PhoneTypeFormComponent } from './components/phone-type-form/phone-type-form.component';
import { StudentProfileComponent } from './components/student-profile/student-profile.component';
import { StudentItemComponent } from './components/student-item/student-item.component';
import { MatComponentsModule } from './modules/mat-components/mat-components.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { MessageService } from 'primeng/api';
import { UserService } from './services/user.service';
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SideBarComponent } from './side-bar/side-bar.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryItemComponent } from './components/category-item/category-item.component';
import { LessonItemComponent } from './components/lesson-item/lesson-item.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { AccountPageComponent } from './components/account-page/account-page.component';
import { PasswordComponent } from './formComponents/password/password.component';
import { TeacherListComponent } from './components/teacher-list/teacher-list.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { UserItemComponent } from './components/user-item/user-item.component';
import { TeacherProfileComponent } from './components/teacher-profile/teacher-profile.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

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

import { AdminTeachersListComponent } from './components/admin-teachers-list/admin-teachers-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTablesModule } from 'angular-datatables';

import { CommonModule } from '@angular/common';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { CalendarComponent } from './Meet-calendar/calendar/calendar.component';
import { OrganizeMeetingComponent } from './Meet-calendar/organize-meeting/organize-meeting.component';
import { MeetUserItemComponent } from './Meet-calendar/meet-user-item/meet-user-item.component';

import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RatingComponent } from './components/rating/rating.component';
// import { AuthGuardService } from './services/auth-guard.service';
// import { AdminAuthGuardService } from './services/admin-auth-guard.service';
// import { UserFormComponent } from './components/admin/user-form/user-form.component';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { TmUsersComponent } from './components/taskManager/tm-users/tm-users.component';
import { CommentComponent } from './components/taskManager/comment/comment.component';
import { TmViewProfileComponent } from './components/taskManager/tm-view-profile/tm-view-profile.component';
import { ViewCommentsComponent } from './components/taskManager/view-comments/view-comments.component';
// import { PaginationComponent } from './components/pagination/pagination.component';
import { NgxFlagPickerModule } from 'ngx-flag-picker';

import { UserCommentsComponent } from './components/admin/user-comments/user-comments.component';
import { CommentDetailsComponent } from './components/comment-details/comment-details.component';
import { ConfirmComponent } from './components/dialogs/confirm/confirm.component';
import { LevelComponent } from './components/level/level.component';
// import { VideoScreenComponent } from './Zoom/video-screen/video-screen.component';

import {MatExpansionModule} from '@angular/material/expansion';


import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';
import { MeetingComponent } from './Zoom/meeting/meeting.component';

import { SanitizerPipe } from 'src/app/Pipes/sanitizer.pipe';
import { MicRecordComponent } from './components/mic-record/mic-record.component';
import { AudioRecorderComponent } from './components/audio-recorder/audio-recorder.component';

import { NgAudioRecorderModule } from 'ng-audio-recorder';
import { LessonListComponent } from './components/lesson-list/lesson-list.component';
import { CircleButtonComponent } from './components/circle-button/circle-button.component';
import { ProgressListComponent } from './components/progress-list/progress-list.component';
import { MessengerFullViewComponent } from './Messenger/messenger-full-view/messenger-full-view.component';
import { MessengerMainComponent } from './Messenger/messenger-main/messenger-main.component';
import { Page1Component } from './home/page1/page1.component';
import { Page4Component } from './home/page4/page4.component';
import { Page5Component } from './home/page5/page5.component';
import { Page3Component } from './home/page3/page3.component';
import { Page2Component } from './home/page2/page2.component';
import { PricingComponent } from './components/pricing/pricing.component';


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
    AdminTeachersListComponent,
    CalendarComponent,
    OrganizeMeetingComponent,
    MeetUserItemComponent,
    RatingComponent,
    // UserFormComponent,
    AdminUsersComponent,
    StudentItemComponent,
    StudentsListComponent,
    StudentProfileComponent,
    MeetingComponent,
    SanitizerPipe,


    TmUsersComponent,
    CommentComponent,
    TmViewProfileComponent,
    ViewCommentsComponent,
    PhoneTypeFormComponent,
    UserCommentsComponent,
    CommentDetailsComponent,
    ConfirmComponent,
    MicRecordComponent,
    AudioRecorderComponent,
    LevelComponent,
    LessonListComponent,
    CircleButtonComponent,
    ProgressListComponent,
    MessengerFullViewComponent,
    MessengerMainComponent,
    Page1Component,
    Page4Component,
    Page5Component,
    Page3Component,
    Page2Component,
    PricingComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MenubarModule,
    FontAwesomeModule,
    NoopAnimationsModule,
    PasswordModule,
    CheckboxModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    BrowserAnimationsModule,
    MatComponentsModule,
    CommonModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NgbModule,
    DataTablesModule,
    MatExpansionModule,
    MatSortModule,
    MatPaginatorModule,
    MatTabsModule,
    MatDividerModule,
    NgxFlagPickerModule,
    NgAudioRecorderModule,
  ],
  providers: [
    ZoomService,
    UserService,
    MessageService,
    HttpClient,
    // AuthGuardService,
    // AdminAuthGuardService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

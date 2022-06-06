import { TsGuard } from './guards/ts.guard';
import { TaskManagerGuard } from './guards/task-manager.guard';
import { UserGuard } from './guards/user.guard';
import { TeacherGuard } from './guards/teacher.guard';
import { StudentGuard } from './guards/student.guard';
import { MessengerFullViewComponent } from './Messenger/messenger-full-view/messenger-full-view.component';
import { AudioRecorderComponent } from './components/audio-recorder/audio-recorder.component';
import { MicRecordComponent } from './components/mic-record/mic-record.component';
import { LevelComponent } from './components/level/level.component';
import { StudentProfileComponent } from './components/student-profile/student-profile.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { CalendarComponent } from './Meet-calendar/calendar/calendar.component';
import { TasksComponent } from './todolist/tasks/tasks.component';
import { ActivateEmailComponent } from './components/activate-email/activate-email.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AccountPageComponent } from './components/account-page/account-page.component';
import { TeacherListComponent } from './components/teacher-list/teacher-list.component';
import { TeacherProfileComponent } from './components/teacher-profile/teacher-profile.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { PasswordResetConfirmComponent } from './components/password-reset-confirm/password-reset-confirm.component';

import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';

import { TmUsersComponent } from './components/taskManager/tm-users/tm-users.component';
import { MessengerMainComponent } from './Messenger/messenger-main/messenger-main.component';

import { AdminAuthGuard } from './guards/admin-auth.guard';
import { PricingComponent } from './components/pricing/pricing.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },

  { path: 'logout', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile', component: ProfilePageComponent , canActivate: [UserGuard]},
  { path: 'account', component: AccountPageComponent , canActivate: [UserGuard]},
  { path: 'settings', component: AccountPageComponent , canActivate: [UserGuard]},
  { path: 'teachers', component: TeacherListComponent },
  // { path: 'students', component: StudentsListComponent },
  { path: 'students/:id', component: StudentProfileComponent },
  { path: 'teachers/:id', component: TeacherProfileComponent },
  // { path: 'spinner', component: SpinnerComponent },
  { path: 'password-reset', component: PasswordResetComponent },
  {
    path: 'password-reset/:uid/:token',
    component: PasswordResetConfirmComponent,
  },
  { path: 'activate/:uid/:token', component: ActivateEmailComponent },
  { path: 'tasks', component: TasksComponent , canActivate: [TeacherGuard]},

  { path: 'calendar', component: CalendarComponent , canActivate: [UserGuard] },
  { path: 'tm-users', component: TmUsersComponent , canActivate: [TaskManagerGuard]},

  { path: 'admin-users', component: AdminUsersComponent, canActivate: [AdminAuthGuard] },
  // {path: 'admin-users/new', component: UserFormComponent},
  
  { path: 'zoom', loadChildren: () => import('src/app/Zoom/zoom.module').then(m => m.ZoomModule) },
  // { path: 'meeting/:meeting/:role', component: MeetingComponent },

  { path: 'level/:lessonid/:elementid', component: LevelComponent },

  { path: 'chat', component: MessengerMainComponent , canActivate: [TsGuard] },
  { path: 'chat/:receiverid', component: MessengerMainComponent , canActivate: [TsGuard] },
  { path: 'pricing', component: PricingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

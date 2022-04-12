import { TasksComponent } from './todolist/tasks/tasks.component';
import { ActivateEmailComponent } from './components/activate-email/activate-email.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {SignInComponent} from "./sign-in/sign-in.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import { AccountPageComponent } from './components/account-page/account-page.component';
import { TeacherListComponent } from './components/teacher-list/teacher-list.component';
import { TeacherProfileComponent } from './components/teacher-profile/teacher-profile.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { PasswordResetConfirmComponent } from './components/password-reset-confirm/password-reset-confirm.component';
import { ChatComponent } from './components/chat/chat.component';
import { MessengerComponent } from './Messenger/messenger/messenger.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: SignInComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'logout', component: HomeComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'profile', component: ProfilePageComponent},
  {path: 'account', component: AccountPageComponent},
  {path: 'settings', component: AccountPageComponent},
  {path: 'teachers', component: TeacherListComponent},
  {path: 'teachers/:id', component: TeacherProfileComponent},
  {path: 'spinner', component: SpinnerComponent},
  {path: 'password-reset', component: PasswordResetComponent},
  {path: 'password-reset/:uid/:token', component: PasswordResetConfirmComponent},
  {path: 'activate/:uid/:token', component: ActivateEmailComponent},
  {path: 'tasks', component: TasksComponent},
  {path: 'chat', component: MessengerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

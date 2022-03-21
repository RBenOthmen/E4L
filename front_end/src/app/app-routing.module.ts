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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

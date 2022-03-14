import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {SignInComponent} from "./sign-in/sign-in.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import { AccountPageComponent } from './components/account-page/account-page.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: SignInComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'logout', component: HomeComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'profile', component: ProfilePageComponent},
  {path: 'account', component: AccountPageComponent},
  {path: 'photo', component: ProfilePageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

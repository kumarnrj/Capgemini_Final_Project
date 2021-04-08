import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { ForgetPasswordComponent } from './component/forget-password/forget-password.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { VerifyUserComponent } from './component/verify-user/verify-user.component';
import {AuthGuard} from './Services/auth.guard';
import { ProfileComponent } from './component/profile/profile.component';
import {UserLoggedIn,Profileactive} from './Services/LoggedInUser.guard';
import { MyOrdresComponent } from './my-ordres/my-ordres.component';

const routes: Routes = [
  {path:'login',component:LoginComponent,canActivate:[UserLoggedIn]},
  {path:'signup',component:SignupComponent,canActivate:[UserLoggedIn]},
  {path:'verify',component:VerifyUserComponent},
  {path:'forgetPassword',component:ForgetPasswordComponent},
  {path:'changePassword',component:ChangePasswordComponent,canActivate:[AuthGuard]},
  {path:'profile',component:ProfileComponent,canActivate:[Profileactive]},
  {path:'myorders',component:MyOrdresComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation:'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

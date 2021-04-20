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
import { MyOrdresComponent } from './component/my-ordres/my-ordres.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { OrdersDetailComponent } from './component/orders-detail/orders-detail.component';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';
import { UserDetailComponent } from './component/user-detail/user-detail.component';
import { WasherDashboardComponent } from './component/washer-dashboard/washer-dashboard.component';
import { OrderListComponent } from './component/order-list/order-list.component';
import { ReviewAndRatingComponent } from './component/review-and-rating/review-and-rating.component';
import { HomeComponent } from './component/home/home.component';
import {BookingComponent} from './component/booking/booking.component';

const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'booking',component:BookingComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent,canActivate:[UserLoggedIn]},
  {path:'verify',component:VerifyUserComponent},
  {path:'forgetPassword',component:ForgetPasswordComponent},
  {path:'changePassword',component:ChangePasswordComponent,canActivate:[AuthGuard]},
  {path:'myaccount/profile',component:ProfileComponent,canActivate:[Profileactive]},
  {path:'myaccount/myorders',component:MyOrdresComponent},
  {path:'myaccount/myorders/:id',component:OrdersDetailComponent},
  {path:'adminDashboard',component:AdminDashboardComponent},
  {path:'adminDashboard/:user',component:UserDetailComponent},
  {path:'washerDashboard',component:WasherDashboardComponent},
  {path:'Dashboard/Orders',component:OrderListComponent},
  {path:'Reviews-Rating',component:ReviewAndRatingComponent},
  {path:'**',component:PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation:'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

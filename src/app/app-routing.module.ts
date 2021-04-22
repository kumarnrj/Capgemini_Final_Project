import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { ForgetPasswordComponent } from './component/forget-password/forget-password.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { VerifyUserComponent } from './component/verify-user/verify-user.component';
import {AuthGuard} from './Services/auth.guard';
import { ProfileComponent } from './component/profile/profile.component';
import {UserLoggedIn,Profileactive,
  roleAdmin,roleCustomer,roleWasher,UserAdminOrWasher} from './Services/LoggedInUser.guard';
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
import { PayementGatewayComponent } from './component/payement-gateway/payement-gateway.component';
import { ServicesComponent } from './component/services/services.component';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { AboutUsComponent } from './component/about-us/about-us.component';
import { UnauthorizedAccessComponent } from './component/unauthorized-access/unauthorized-access.component';

const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'booking',component:BookingComponent,canActivate:[UserLoggedIn]},
  {path:'services',component:ServicesComponent},
  {path:'contact',component:ContactUsComponent},
  {path:'aboutus',component:AboutUsComponent},
  {path:'payment-gateway',component:PayementGatewayComponent,canActivate:[UserLoggedIn]},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'verify',component:VerifyUserComponent},
  {path:'forgetPassword',component:ForgetPasswordComponent},
  {path:'changePassword',component:ChangePasswordComponent,canActivate:[AuthGuard]},
  {path:'myaccount/profile',component:ProfileComponent,canActivate:[Profileactive]},
  {path:'myaccount/myorders',component:MyOrdresComponent},
  {path:'myaccount/myorders/:id',component:OrdersDetailComponent},
  {path:'adminDashboard',component:AdminDashboardComponent,canActivate:[roleAdmin]},
  {path:'adminDashboard/:user',component:UserDetailComponent,canActivate:[roleAdmin]},
  {path:'washerDashboard',component:WasherDashboardComponent,canActivate:[roleWasher]},
  {path:'Dashboard/Orders',component:OrderListComponent,canActivate:[UserAdminOrWasher]},
  {path:'Reviews-Rating',component:ReviewAndRatingComponent,canActivate:[UserAdminOrWasher]},
  {path:'unauthorized',component:UnauthorizedAccessComponent},
  {path:'**',component:PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation:'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

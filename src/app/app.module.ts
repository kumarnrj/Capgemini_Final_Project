import { BrowserModule } from '@angular/platform-browser';
import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from "@angular/forms"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import { LoginComponent } from './component/login/login.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
// For Cascading Modal only
import { TabsModule } from 'ng-uikit-pro-standard';
import { SignupComponent } from './component/signup/signup.component';
import { TestComponent } from './test/test.component';
import { VerifyUserComponent } from './component/verify-user/verify-user.component';
import { ForgetPasswordComponent } from './component/forget-password/forget-password.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { LoaderInterceptorService } from './Interceptors/loader-interceptor.service';
import { ProfileComponent } from './component/profile/profile.component';
import { MyOrdresComponent } from './component/my-ordres/my-ordres.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { OrdersDetailComponent } from './component/orders-detail/orders-detail.component';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';
import { UserDetailComponent } from './component/user-detail/user-detail.component';
import { WasherDashboardComponent } from './component/washer-dashboard/washer-dashboard.component';
import { OrderListComponent } from './component/order-list/order-list.component';
import { ReviewAndRatingComponent } from './component/review-and-rating/review-and-rating.component';
import { HomeComponent } from './component/home/home.component';
import { BookingComponent } from './component/booking/booking.component';
import {DatePipe} from '@angular/common';
import { PayementGatewayComponent } from './component/payement-gateway/payement-gateway.component';
import { ServicesComponent } from './component/services/services.component'
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    TestComponent,
    VerifyUserComponent,
    ForgetPasswordComponent,
    ChangePasswordComponent,
    ProfileComponent,
    MyOrdresComponent,
    PageNotFoundComponent,
    OrdersDetailComponent,
    AdminDashboardComponent,
    UserDetailComponent,
    WasherDashboardComponent,
    OrderListComponent,
    ReviewAndRatingComponent,
    HomeComponent,
    BookingComponent,
    PayementGatewayComponent,
    ServicesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
  ],
  schemas:[NO_ERRORS_SCHEMA],
  providers: [
    DatePipe,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:LoaderInterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

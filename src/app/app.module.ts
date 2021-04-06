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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    TestComponent,
    VerifyUserComponent,
    ForgetPasswordComponent,
    ChangePasswordComponent,
    ProfileComponent
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
    {
      provide:HTTP_INTERCEPTORS,
      useClass:LoaderInterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

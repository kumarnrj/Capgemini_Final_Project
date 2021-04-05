import { BrowserModule } from '@angular/platform-browser';
import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from "@angular/forms"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import { LoginComponent } from './login/login.component';
import {HttpClientModule} from '@angular/common/http'
// For Cascading Modal only
import { TabsModule } from 'ng-uikit-pro-standard';
import { SignupComponent } from './signup/signup.component';
import { TestComponent } from './test/test.component';
import { VerifyUserComponent } from './verify-user/verify-user.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    TestComponent,
    VerifyUserComponent,
    ForgetPasswordComponent,
    ChangePasswordComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

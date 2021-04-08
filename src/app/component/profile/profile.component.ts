import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { User } from 'src/app/Services/User';
import { UserDetails } from 'src/app/Services/UserDetails';
import { PasswordValidator } from 'src/app/shared/password.validator';
import swal from 'sweetalert2';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  // to display the currently loggedIn user
  public user: String;

  // variable to toggle the edit and cancel button
  public NameFields = true;
  public EmailField = true;
  public MobileField = true;
  public addressField = true;

  //
  private userId;

  // User object to recieve data
  LoggedInUser: UserDetails;

  //constructor
  constructor(private auth: AuthenticationService,
    private fb: FormBuilder,
    private router: Router) { }


  // Reactive forms
  // using formGroup
  EditForm = new FormGroup({
    firstName: new FormControl({ value: '', disabled: true }, Validators.required),
    lastName: new FormControl({ value: '', disabled: true }, Validators.required),
    email: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.email]),
    phone: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.pattern('^\\d{10}$')]),
    address: new FormGroup({
      pincode: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.pattern('^\\d{6}$')]),
      city: new FormControl({ value: '', disabled: true }, Validators.required),
      state: new FormControl({ value: '', disabled: true }, Validators.required),
      street: new FormControl({ value: '', disabled: true }, Validators.required)
    })
  });

  // init method
  ngOnInit(): void {

    this.auth.getUserData(localStorage.getItem("email"))
      .subscribe(res => {
        this.LoggedInUser = res;
        this.userId = res._id;
        this.user = this.LoggedInUser.firstName;
        this.setValueToEditForm();
      })
  }

  // set value to the form
  setValueToEditForm() {
    this.EditForm.setValue({
      firstName: this.LoggedInUser.firstName,
      lastName: this.LoggedInUser.lastName,
      email: this.LoggedInUser.email,
      phone: this.LoggedInUser.phone,
      address: {
        pincode: this.LoggedInUser.address.pincode,
        city: this.LoggedInUser.address.city,
        state: this.LoggedInUser.address.state,
        street: this.LoggedInUser.address.street
      }
    })
  }


  // creating form builder to handle the response in the UI

  get firstName() {
    return this.EditForm.get('firstName');
  }

  get lastName() {
    return this.EditForm.get('lastName');
  }

  get email() {
    return this.EditForm.get('email');
  }


  get mobile() {
    return this.EditForm.get('phone');
  }

  get pincode() {
    return this.EditForm.get('address.pincode')
  }
  get city() {
    return this.EditForm.get('address.city')
  }
  get state() {
    return this.EditForm.get('address.state')
  }
  get street() {
    return this.EditForm.get('address.street')
  }



  // for handling the toggling between edit and cancel button

  onPersonalInfo() {
    this.NameFields = false;
    this.EditForm.get('firstName').enable();
    this.EditForm.get('lastName').enable();
  }
  onPersonalInfoCan() {
    this.NameFields = true;
     this.setValueToEditForm();
    this.EditForm.get('firstName').disable();
    this.EditForm.get('lastName').disable();
  }
  onEmail() {
    this.EditForm.get('email').enable();
    this.EmailField = false;
  }
  onEmailCan() {
    this.EditForm.get('email').disable();
     this.setValueToEditForm();
    this.EmailField = true;
  }
  onMobile() {
    this.MobileField = false;
    this.EditForm.get("phone").enable();
  }
  onMobileCan() {
    this.MobileField = true;
    this.setValueToEditForm()
    this.EditForm.get("phone").disable();
  }

  onAddress() {
    this.addressField = false;
     this.setValueToEditForm();
    this.EditForm.get('address.pincode').enable();
    this.EditForm.get('address.city').enable();
    this.EditForm.get('address.state').enable();
    this.EditForm.get('address.street').enable();
  }
  onAddressCan() {
    this.addressField = true;
    this.EditForm.get('address.pincode').disable();
    this.EditForm.get('address.city').disable();
    this.EditForm.get('address.state').disable();
    this.EditForm.get('address.street').disable();
  }


  // on submitting the form 
  onSubmit() {
    console.log(this.userId)
    console.log(this.EditForm)
    this.auth.updateUser(this.EditForm.value, this.userId)
      .subscribe(res => {
        swal.fire("Done", "Data changed successfully", "info");
        // this.reloadCurrentRoute();
      }, err => console.log(err))
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  // on canceling the request
  onCancel() {
    this.onPersonalInfoCan()
    this.onEmailCan()
    this.onMobileCan()
    this.onAddressCan()
    this.EditForm.reset();
    this.setValueToEditForm();
  }

}

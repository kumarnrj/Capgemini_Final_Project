import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, Validator } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { UserDetails } from 'src/app/Services/UserDetails';
import { PasswordValidator } from 'src/app/shared/password.validator';
import swal from 'sweetalert2';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  @ViewChild('frame') public modal: any;

  public personTest;
  public isUpdateUser = false;
  public role;
  private isEditButtonPressed = false;
  public isAddButtonPressed = false;
  private currentUserId;

  public userList: UserDetails[];


  constructor(private auth: AuthenticationService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }


  EditForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern("^(?=.*\\d)(?=.*[a-z])(?=.*[@$!%*#?&])(?=.*[A-Z])(?!.*\\s).{8,}$")]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^\\d{10}$')]),
    address: new FormGroup({
      pincode: new FormControl('', [Validators.required, Validators.pattern('^\\d{6}$')]),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required)
    })
  });



  ngOnInit() {
    this.role = this.route.snapshot.paramMap.get("user");

    // calling the service to fetch the data from database
    setTimeout(() => {
      if (this.role === "users") {
        console.log(this.role);

        this.auth.getAllUser()
          .subscribe(res => {
            this.userList = res.filter(user => user.role === 'ROLE_USER')
          })

      }
      if (this.role === "washers") {
        console.log(this.role);

        this.auth.getAllUser()
          .subscribe(res => {
            this.userList = res.filter(user => user.role === 'ROLE_WASHER')
          })
      }
    }, 1);


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

  get password() {
    return this.EditForm.get('password');
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


  // remove the data from the list 

  remove(id: any, userId: any) {
    console.log(id);
    this.userList.splice(id, 1);

    // removing the data from the database
    this.auth.removeUser(userId)
      .subscribe(res => {
        swal.fire("Done", "User Deleted", "success");

      })

  }



  // current person details

  edit(user) {
    console.log(user);
    this.isAddButtonPressed = false;
    this.isEditButtonPressed = true;
    this.currentUserId = user._id;
    this.setValueToEditForm(user);
    this.modal.show();
  }

  // setting values to the form
  setValueToEditForm(currentUser: UserDetails) {
    this.EditForm.setValue({
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      password: currentUser.password,
      phone: currentUser.phone,
      address: {
        pincode: currentUser.address.pincode,
        city: currentUser.address.city,
        state: currentUser.address.state,
        street: currentUser.address.street
      }
    })
  }

  // adding a new user
  addUser() {
    this.isEditButtonPressed = false
    this.isAddButtonPressed = true;
    this.EditForm.reset();
    this.modal.show();
  }


  // On Submitting the form
  onSubmit() {
    if (this.isEditButtonPressed) {
      console.log(this.EditForm.value);
      console.log(this.currentUserId);
      this.isEditButtonPressed = false;
      this.auth.updateUser(this.EditForm.value, this.currentUserId)
        .subscribe(res => {
          this.modal.hide();
          swal.fire("Done", "Updated Successfully", "success");
          this.ngOnInit();

        })
    }
    if (this.isAddButtonPressed) {
      if (this.role === "washers") {
        console.log("Inside washer")
        this.isAddButtonPressed = false;
        console.log(this.EditForm.value);
        let user:UserDetails;
        user = this.EditForm.value;
        user.role = "ROLE_WASHER";
        console.log(user);
        this.auth.registerUser(user)
          .subscribe(res => {
            this.modal.hide();
            swal.fire("Done", "Account Created", "success");
            this.ngOnInit();
          })
      }
      else{
        this.auth.registerUser(this.EditForm.value)
          .subscribe(res => {
            this.modal.hide();
            swal.fire("Done", "Account Created", "success");
            this.ngOnInit();
          })
      }

    }
  }



}

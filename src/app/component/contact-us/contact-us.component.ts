import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import swal from 'sweetalert2';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  validatingForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.validatingForm = new FormGroup({
      name:new FormControl('',Validators.required),
      email:new FormControl('',[Validators.required,Validators.email]),
      subject:new FormControl('',Validators.required),
      message:new FormControl('',Validators.required)
    })
  }

 // creating the object to get the form object 
 get name(){
    return this.validatingForm.get("name");
 } 

 get email(){
   return this.validatingForm.get("email");
 }

 get subject(){
   return this.validatingForm.get("subject");
 }

 get message(){
   return this.validatingForm.get("message");
 }

 // sending the customer query
 SendQuery(){
    swal.fire("Done","You Query Has been registered We will get back to you soon","success");
    // do something
 }
}

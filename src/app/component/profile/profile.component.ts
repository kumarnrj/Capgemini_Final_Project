import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public user="Neeraj Kumar";
  
  public NameFields=true;
  public EmailField=true;
  public MobileField=true;


  constructor() { }

  ngOnInit(): void {
  }
  onPersonalInfo(){
    this.NameFields=false;
  }
  onPersonalInfoCan(){
    this.NameFields=true;
  }
  onEmail(){
    this.EmailField=false;
  }
  onEmailCan(){
    this.EmailField=true;
  }
  onMobile(){
    this.MobileField=false;
  }
  onMobileCan(){
    this.MobileField=true;
  }

}

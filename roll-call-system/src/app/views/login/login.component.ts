import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  /*
  * FormGroup used for formcontrol in the addSponsor form
  */
 loginForm: FormGroup;

 /**
  * ngModel property for email
  */
 email: string;

 /**
  * ngModel property for password
  */
 password: string;

 VERSION: string;

 constructor(private fb: FormBuilder, /* private userSvc: UserService */) {
   //this.VERSION = environment.VERSION;
 }

 /**
  * Creates the login form
  */
 ngOnInit(): void {
   this.createForm();
 }

 /**
  * Creates a login form
  * sets email validation for email through ng2-validation
  * and password must just not be empty
  */
 createForm(){
   this.loginForm = this.fb.group({
     email: ['', CustomValidators.email],
     password: ['',  Validators.required],
   })
 }

 /**
  * Sends a login request through the UserService
  * Passes the email and password as a LoginCredentials object
  */
 login() {
   const credentials: any = {
     email: this.email,
     password: this.password
   };

  // this.userSvc.login(credentials);
 }

}
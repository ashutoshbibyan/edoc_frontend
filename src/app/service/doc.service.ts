import { DocSignUpForm } from './../formdata/doc.signup.form';
import { UserSignInFormData } from './../formdata/user.signin.form';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DocService {

  constructor() { }

  userSignIn(userSignInForm: UserSignInFormData){

  }

  signUp(docSignUpForm: DocSignUpForm){

  }
}

import { UserSignInFormData } from './../formdata/user.signin.form';
import { DocService } from './../service/doc.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import{notEmpty} from "../validators/notempty";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signInFormGroup: FormGroup;

  constructor(private fb: FormBuilder , private docService: DocService) { }

  ngOnInit(): void {

    this.signInFormGroup = this.fb.group({
      'userName' : ['' ,[notEmpty()]] ,
      'password' : ['' ,[notEmpty()]]
    });

  }

  onSubmit(){

    let formData: UserSignInFormData = {userName: this.signInFormGroup.controls["userName"].value ,
  password: this.signInFormGroup.controls['password'].value};

    this.docService.userSignIn(formData);
  }

  getUserNameError(){
    let userNameControl = this.signInFormGroup.controls['userName'];

    if(userNameControl.hasError('Not Empty')){

      return 'Please Enter UserName';

    }
  }


  getPasswordError(){

    let passwordControl= this.signInFormGroup.controls['password'];

    if(passwordControl.hasError('Not Empty')){
      return 'Please Enter Password';
    }
  }

}

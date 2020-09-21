import { UserSignInFormData } from './../formdata/user.signin.form';
import { DocService } from './../service/doc.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import{notEmpty} from "../validators/notempty";
import { phoneValidator } from '../validators/phoneno.validator';
import { passwordValidator } from '../validators/password.validator';

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
      'phoneNo' : ['' ,[notEmpty() , phoneValidator()]] ,
      'password' : ['' ,[notEmpty() , passwordValidator()]]
    });

  }

  onSubmit(){

    let formData: UserSignInFormData = {phoneNo: this.signInFormGroup.controls["phoneNo"].value ,
  password: this.signInFormGroup.controls['password'].value};

    this.docService.userSignIn(formData);
  }


  getPhoneNoError(){
    let phoneNoControl = this.signInFormGroup.controls['phoneNo'];

    if(phoneNoControl.hasError('Not Empty')){

      return 'Please Enter PhoneNo';

    }
    else if(phoneNoControl.hasError('Invalid PhoneNo')){
      return `Invalid PhoneNo (ex- 0123456789)`;
    }
  }


  getPasswordError(){

    let passwordControl= this.signInFormGroup.controls['password'];

    if(passwordControl.hasError('Not Empty')){
      return 'Please Enter Password';
    }

    else if (passwordControl.hasError('Invalid Password')){
      return `Password can't have space in it`;
    }
  }

}

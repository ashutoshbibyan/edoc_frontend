import { DocSignUpForm } from './../formdata/doc.signup.form';
import { DocService } from './../service/doc.service';
import { OtpService } from './../service/otp.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { notEmpty } from '../validators/notempty';
import {phoneValidator} from '../validators/phoneno.validator';
import {passwordValidator} from "../validators/password.validator";
import {otpValidator} from "../validators/otp.validators";

import { Observable, Subscriber } from 'rxjs';




@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  stepOneFormGroup: FormGroup;

  stepTwoFormGroup: FormGroup;

  deactivated: boolean = true;

  deactivatedCall: boolean = true;

  countDown ;


  countDownVoice ;


  constructor(private fb: FormBuilder , private otpService: OtpService , private docService: DocService) { }

  ngOnInit(): void {
    this.stepOneFormGroup = this.fb.group({
      'phoneNo':['' , [notEmpty() , phoneValidator()]],
      'password':['', [notEmpty() , passwordValidator()]]
    });

    this.stepTwoFormGroup = this.fb.group({
      'otp':['' , [notEmpty() , otpValidator()]]
    });

  }


  getPhoneNoError(): string{

    let phoneNoControl = this.stepOneFormGroup.controls['phoneNo'];

    if(phoneNoControl.hasError('Not Empty')){
      return 'Please Enter Phone No';
    }
    else if(phoneNoControl.hasError('PhoneNo Invalid')){
      return "Invalid Phone No (ex - 4567893219 )";
    }

  }

  getPasswordError(): string{

    let passwordControl = this.stepOneFormGroup.controls['password'];

    if(passwordControl.hasError('Not Empty')){
      return "Password Can't Be Empty ";
    }
    else if (passwordControl.hasError('Invalid Password')){
      return `Password can't have space in it`;
    }
  }

  getOtpError(): string{

    let otpControl = this.stepTwoFormGroup.controls['otp'];

    if(otpControl.hasError('Not Empty')) {
      return 'Please Enter Otp';
    }

    else if(otpControl.hasError('Invalid Otp')){

      if(!otpControl.value.match(/^\S*$/)){
        return `Can't have Space In Otp` ;
      }
      else if(!otpControl.value.match(/^[0-9]*$/)){
        return `Can't have Character or Symbol In Otp`;
      }
      else if(otpControl.value.trim().length !== 4 ) {
        return `length should be 4 numbers` ;
      }
    }

  }


  goToStepTwo(){

    this.countDown = new Observable<string>((observer: Subscriber<string>) => {

      let count:number=20;

      setInterval(() => {
          count--;
          if(count>0){
              observer.next("Send Again In "+count+" Sec")
          }

          if(count==0){
              observer.next("Send Otp Again");
              this.deactivated=false;
          }

      }, 1000);
    });

    this.countDownVoice = new Observable<string>((observer: Subscriber<string>) => {

      let count:number=40;

      setInterval(() => {
          count--;
          if(count>0){
              observer.next("Send Voice Otp In "+count+" Sec")
          }

          if(count==0){
              observer.next("Send Otp Call");
              this.deactivatedCall=false;
          }

      }, 1000);
    });

    let phoneNoControl = this.stepOneFormGroup.controls['phoneNo'];

    this.otpService.sendOtp(phoneNoControl.value);

  }

  sendOtpAgain(){

    let phoneNoControl = this.stepOneFormGroup.controls['phoneNo'];


    this.otpService.sendOtpAgain(phoneNoControl.value);

  }

  sendOtpCall(){

    let phoneNoControl = this.stepOneFormGroup.controls['phoneNo'];

    this.otpService.sendOtpCall(phoneNoControl.value);

  }


  onSubmit(){

    let phoneNo = this.stepOneFormGroup.controls['phoneNo'].value;
    let password = this.stepOneFormGroup.controls['password'].value;
    let otp = this.stepTwoFormGroup.controls['otp'].value;

    let docSignUpForm: DocSignUpForm = {phoneNo , password , otp};

    this.docService.signUp(docSignUpForm);
  }

}

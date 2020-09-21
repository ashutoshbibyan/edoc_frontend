import { DocSignUpForm } from './../formdata/doc.signup.form';
import { OtpService } from './../service/otp.service';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { DocService } from '../service/doc.service';

fdescribe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let otpServiceMock: jasmine.SpyObj<OtpService>;
  let docServiceMock: jasmine.SpyObj<DocService>;

  /** list of dom elements starts  */

  let inputPhoneNo: HTMLInputElement ;
  let errPhoneNo: any;
  let inputPassword: HTMLInputElement ;
  let errPassword: any ;
  let btnNxtStepOne: HTMLButtonElement ;
  let inputOtp: HTMLInputElement;
  let errOtp: any ;
  let btnSendOtpAgain: HTMLButtonElement;
  let btnSendOtpCall: HTMLButtonElement;
  let btnPrevious: HTMLButtonElement ;
  let btnSubmit: HTMLButtonElement ;



  /** list of dom elements ends  */

  /** list of the form controls starts  */

  let phoneNoControl: AbstractControl;
  let passwordControl: AbstractControl;
  let otpControl: AbstractControl;

  /** list of the form controls ends  */

  /** list of stub values starts  */

  let phoneNoStub: string = '0123456789';
  let passwordStub: string ="123456";
  let otpStub: string = "1234";
  /** list of stub values ends  */


  const inputEvent: Event = new Event('input');

  beforeEach(async(() => {
    otpServiceMock = jasmine.createSpyObj<OtpService>("OtpService" , ['sendOtp' , 'sendOtpAgain' , 'sendOtpCall']);
    docServiceMock = jasmine.createSpyObj<DocService>("DocService" , ['signUp']);
    TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      imports:[ReactiveFormsModule],
      providers:[
        {provide: OtpService , useValue: otpServiceMock},
        {provide: DocService , useValue: docServiceMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function el(selector: string): any {
  return fixture.debugElement.nativeElement.querySelector(selector);
   }

  function elAll(selector: string): any[] {
  return fixture.debugElement.nativeElement.querySelectorAll(selector);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Signup Form Tests  ' , () => {

    beforeEach(() => {
      inputPhoneNo = el('[data-test="input-phoneno"]');
      errPhoneNo = el('[data-test="err-phoneno"]');
      inputPassword = el('[data-test="input-password"]');
      errPassword = el('[data-test="err-password"]');
      btnNxtStepOne = el('[data-test="btn-nxt-step-one"]');

      inputOtp = el('[data-test="input-otp"]');
      errOtp = el ('[data-test="err-otp"]');
      btnSendOtpAgain = el('[data-test="btn-send-opt-again"]');
      btnSendOtpCall = el('[data-test="bnt-send-otp-call"]');
      btnPrevious = el('[data-test="btn-prev"]');

      btnSubmit = el('[data-test="btn-submit"]');

      phoneNoControl = component.stepOneFormGroup.controls['phoneNo'];
      passwordControl = component.stepOneFormGroup.controls['password'];

      otpControl = component.stepTwoFormGroup.controls['otp'];
    });

    describe('phone no and password form step one tests ' , () => {

      it('should render the step one ' , () => {
        expect(inputPhoneNo).toBeTruthy();
        expect(inputPassword).toBeTruthy();
        expect(btnNxtStepOne).toBeTruthy();
        expect(inputPhoneNo.type).toEqual("text");
        expect(inputPassword.type).toEqual("password");
      });


      it('should have value of the input fields in the formgroup ' , () => {

        inputPhoneNo.value = phoneNoStub ;
        inputPassword.value = passwordStub;

        inputPhoneNo.dispatchEvent(inputEvent);
        inputPassword.dispatchEvent(inputEvent);

        fixture.detectChanges();

        expect(phoneNoControl.value).toEqual(phoneNoStub);
        expect(passwordControl.value).toEqual(passwordStub);

      });

      it('phone no should not be empty ' , () => {
        inputPhoneNo.value = "";
        inputPhoneNo.dispatchEvent(inputEvent);

        fixture.detectChanges();

        expect(phoneNoControl.valid).toEqual(false);
        expect(errPhoneNo).toBeTruthy();
        expect(component.getPhoneNoError()).toEqual("Please Enter Phone No");
      });

      it('phone no can not be just empty spaced ' , () => {
        inputPhoneNo.value="    ";
        inputPhoneNo.dispatchEvent(inputEvent);

        fixture.detectChanges();

        expect(phoneNoControl.valid).toEqual(false);
        expect(errPhoneNo).toBeTruthy();
        expect(component.getPhoneNoError()).toEqual("Please Enter Phone No");

      });

      it('phone no should not have space in it ' , () => {

        inputPhoneNo.value = '999  88989' ;
        inputPhoneNo.dispatchEvent(inputEvent);

        fixture.detectChanges();

        expect(phoneNoControl.valid).toEqual(false);
        expect(errPhoneNo).toBeTruthy();
        expect(component.getPhoneNoError()).toEqual('Invalid Phone No (ex - 4567893219 )');

      });

      it('phone no should not have character  in it ' , () => {

        inputPhoneNo.value = '99ashu9891' ;
        inputPhoneNo.dispatchEvent(inputEvent);

        fixture.detectChanges();

        expect(phoneNoControl.valid).toEqual(false);
        expect(errPhoneNo).toBeTruthy();
        expect(component.getPhoneNoError()).toEqual('Invalid Phone No (ex - 4567893219 )');

      });

      it('phone no should not be more than 10 digit in it ' , () => {

        inputPhoneNo.value = '012345678910' ;
        inputPhoneNo.dispatchEvent(inputEvent);

        fixture.detectChanges();

        expect(phoneNoControl.valid).toEqual(false);
        expect(errPhoneNo).toBeTruthy();
        expect(component.getPhoneNoError()).toEqual('Invalid Phone No (ex - 4567893219 )');

      });

      it('phone no should not have symbols  in it ' , () => {

        inputPhoneNo.value = '999*/--219' ;
        inputPhoneNo.dispatchEvent(inputEvent);

        fixture.detectChanges();

        expect(phoneNoControl.valid).toEqual(false);
        expect(errPhoneNo).toBeTruthy();
        expect(component.getPhoneNoError()).toEqual('Invalid Phone No (ex - 4567893219 )');

      });

      it('phone No is valid when input is correct ' , () => {

        inputPhoneNo.value = phoneNoStub;
        inputPhoneNo.dispatchEvent(inputEvent);

        fixture.detectChanges();

        expect(phoneNoControl.valid).toEqual(true);
      });

      it('password can  not be empty ' , () => {
        inputPassword.value = "" ;
        inputPassword.dispatchEvent(inputEvent);

        fixture.detectChanges();

        expect(passwordControl.valid).toEqual(false);
        expect(errPassword).toBeTruthy();
        expect(component.getPasswordError()).toEqual("Password Can't Be Empty ");

      });

      it('password should not be just empty space ' , () => {
        inputPassword.value = "    " ;
        inputPassword.dispatchEvent(inputEvent);

        fixture.detectChanges();

        expect(passwordControl.valid).toEqual(false);
      });

      it('password should not have space in it ' , () => {
        inputPassword.value = 'abc  def';
        inputPassword.dispatchEvent(inputEvent);

        fixture.detectChanges();

        expect(passwordControl.valid).toEqual(false);
        expect(errPassword).toBeTruthy();
        expect(component.getPasswordError()).toEqual(`Password can't have space in it`);
      });


      it('password control should be valid when password is in correct form ' , () => {
        inputPassword.value = passwordStub ;
        inputPassword.dispatchEvent(inputEvent);

        fixture.detectChanges();

        expect(passwordControl.valid).toEqual(true);

      });


    });

    describe('otp varification form step two ' , () => {

      it('should render the otp form step two ' , () => {

        expect(inputOtp).toBeTruthy();
        expect(btnSendOtpAgain).toBeTruthy();
        expect(btnSendOtpAgain).toBeTruthy();
        expect(btnPrevious).toBeTruthy();
        expect(btnSubmit).toBeTruthy();

        expect(inputOtp.type).toEqual("text");


      });

      it('should have value of the input field in the formgroup ' , () => {

        inputOtp.value = otpStub;

        inputOtp.dispatchEvent(inputEvent);

        fixture.detectChanges();

        expect(otpControl.value).toEqual(otpStub);


      });


      it('otp should not be empty ' , () => {
         inputOtp.value = "";

         inputOtp.dispatchEvent(inputEvent);

         fixture.detectChanges();

         expect(otpControl.valid).toEqual(false);
         expect(errOtp).toBeTruthy();
         expect(component.getOtpError()).toEqual('Please Enter Otp');

      });


      it('otp should not be just empty spaces ' , () => {
        inputOtp.value= "    ";
        inputOtp.dispatchEvent(inputEvent);

        fixture.detectChanges();

        expect(otpControl.valid).toEqual(false);
        expect(errOtp).toBeTruthy();
        expect(component.getOtpError()).toEqual('Please Enter Otp');
      });

      it('otp should not have any space in between ' , () => {
        inputOtp.value = '13 4';
        inputOtp.dispatchEvent(inputEvent);

        fixture.detectChanges();

        expect(otpControl.valid).toEqual(false);
        expect(errOtp).toBeTruthy();
        expect(component.getOtpError()).toEqual(`Can't have Space In Otp`);
      });

      it('otp should not have any alphabets and symbols in between ' , () => {
        inputOtp.value = '1as4';
        inputOtp.dispatchEvent(inputEvent);

        fixture.detectChanges();

        expect(otpControl.valid).toEqual(false);
        expect(errOtp).toBeTruthy();
        expect(component.getOtpError()).toEqual(`Can't have Character or Symbol In Otp`);
      });

      it('otp should be of length of 4 digit ' , () => {

        inputOtp.value = '12345';
        inputOtp.dispatchEvent(inputEvent);

        fixture.detectChanges();

        expect(otpControl.valid).toEqual(false);
        expect(errOtp).toBeTruthy();
        expect(component.getOtpError()).toEqual(`length should be 4 numbers`);

      });

      it('should be valid when opt value is entered ' , () => {
        inputOtp.value = otpStub;

        inputOtp.dispatchEvent(inputEvent);

        fixture.detectChanges() ;

        expect(otpControl.valid).toEqual(true);
      });


      it('should call the goToStepTwo method when clicked on step one next button ' , () => {
        let goToStepTwoSpy = spyOn(component ,'goToStepTwo');

        btnNxtStepOne.click();

        expect(goToStepTwoSpy).toHaveBeenCalledTimes(1);

      });

      it('should call the send otp method of the otp service when goToStepTwo method execute' , () => {

        let sendOtpSpy = otpServiceMock.sendOtp;

        inputPhoneNo.value = phoneNoStub;
        inputPhoneNo.dispatchEvent(inputEvent);

        fixture.detectChanges();

        component.goToStepTwo();

        fixture.detectChanges();

        expect(sendOtpSpy).toHaveBeenCalledTimes(1);
        expect(sendOtpSpy).toHaveBeenCalledWith(phoneNoStub);


      });

      it('should call the sendOtpAgain method when click on the sendOtpAgain button is clicked ' , () => {

        let sendOtpAgainSpy = spyOn(component , 'sendOtpAgain');

        btnSendOtpAgain.disabled = false;

        btnSendOtpAgain.click();

        fixture.detectChanges();

        expect(sendOtpAgainSpy).toHaveBeenCalledTimes(1);

      });


      it('when sentOtpAgain  is called otpService sentOtpAgain method should call ' , () => {

        let sendOtpAgainSpy = otpServiceMock.sendOtpAgain;

        inputPhoneNo.value = phoneNoStub;
        inputPhoneNo.dispatchEvent(inputEvent);

        fixture.detectChanges();

        component.sendOtpAgain();

        expect(sendOtpAgainSpy).toHaveBeenCalledTimes(1);
        expect(sendOtpAgainSpy).toHaveBeenCalledWith(phoneNoStub);

      });

      it('should call the sendOtpCall method when clicked on the sendOtpCall button is clicked ' , () => {

        let sendOtpCallSpy = spyOn(component , 'sendOtpCall');

        btnSendOtpCall.disabled = false ;

        btnSendOtpCall.click();

        fixture.detectChanges();

        expect(sendOtpCallSpy).toHaveBeenCalledTimes(1);
      });


      it('should call the  sentOtpCall of the otpService when sendOtpCall is called ' , () => {

        let sendOtpCallSpy = otpServiceMock.sendOtpCall;

        inputPhoneNo.value = phoneNoStub ;
        inputPhoneNo.dispatchEvent(inputEvent);

        fixture.detectChanges();

        component.sendOtpCall();


        expect(sendOtpCallSpy).toHaveBeenCalledTimes(1);
        expect(sendOtpCallSpy).toHaveBeenCalledWith(phoneNoStub);

      });

      it('should call the onSubmit method when clicked on the submit button ' , () => {

        let onSubmitSpy = spyOn(component , 'onSubmit');

        btnSubmit.click();

        expect(onSubmitSpy).toHaveBeenCalledTimes(1);
       });


    });

    it('should call the signUp method of the doc service when onSubmit method is executed ' , () => {

      let signUpSpy = docServiceMock.signUp;

      inputPhoneNo.value = phoneNoStub ;
      inputPassword.value = passwordStub;
      inputOtp.value = otpStub;

      inputPhoneNo.dispatchEvent(inputEvent);
      inputPassword.dispatchEvent(inputEvent);
      inputOtp.dispatchEvent(inputEvent);


      fixture.detectChanges();

      component.onSubmit();

      let formData: DocSignUpForm = {phoneNo: phoneNoStub , password : passwordStub , otp: otpStub};

      expect(signUpSpy).toHaveBeenCalledTimes(1);
      expect(signUpSpy).toHaveBeenCalledWith(formData);

    });

  });


});

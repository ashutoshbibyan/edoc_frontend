import { UserSignInFormData } from './../formdata/user.signin.form';
import { DocService } from './../service/doc.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninComponent } from './signin.component';
import { FormControl, ReactiveFormsModule, ValidationErrors, AbstractControl } from '@angular/forms';



describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;

  /** list of the dom element start */

  let InputPhoneNo: HTMLInputElement ;
  let inputPassword: HTMLInputElement ;
  let btnSubmit: HTMLButtonElement ;
  let matErrorPhoneNo: HTMLElement ;
  let matErrorPassword: HTMLElement;
  let labelPhoneNo: HTMLElement;
  let labelPassword: HTMLElement;


  /** list of dom elements ends  */

  /** list of formControl Start */

  let phoneNoControl: AbstractControl;
  let passwordControl: AbstractControl;

  /** list of formContorl Ends  */


  /** stub value start  */

  let phoneNoStub: string = '0123456789';
  let passwordStub: string = "password";

  /** stub value ends  */

  let docServiceMock: jasmine.SpyObj<DocService>;

  const inputEvent = new Event('input');

  beforeEach(async(() => {
    docServiceMock = jasmine.createSpyObj<DocService>('DocService' , ['userSignIn']);
    TestBed.configureTestingModule({
      declarations: [ SigninComponent ],
      imports:[ReactiveFormsModule],
      providers:[
        {provide:DocService , useValue: docServiceMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninComponent);
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


  describe('Sign In form Tests ' , () => {

    beforeEach(() => {
      InputPhoneNo = el('[data-test="input-phoneno"]');
      inputPassword = el('[data-test="input-password"]');
      btnSubmit = el('[data-test="btn-submit"]');
      matErrorPhoneNo = el('[data-test="mat-error-phoneno"]');
      matErrorPassword = el('[data-test="mat-error-password"]');
      labelPhoneNo = el('[data-test="label-phoneno"]');
      labelPassword = el('[data-test="label-password"]');

      phoneNoControl = component.signInFormGroup.controls['phoneNo'];
      passwordControl = component.signInFormGroup.controls['password'];
    });

    it('should render the signin form ' , () => {

      expect(InputPhoneNo).toBeTruthy();
      expect(inputPassword).toBeTruthy();
      expect(btnSubmit).toBeTruthy();
      expect(labelPhoneNo).toBeTruthy();

      expect(InputPhoneNo.type).toEqual("text");
      expect(inputPassword.type).toEqual("password");
      expect(btnSubmit.type).toEqual("submit");

    });

    it('should have PhoneNo in the phone no label  ' , () => {

      expect(labelPhoneNo.innerText).toEqual('PhoneNo');
    });

    it('should have the Password as the label in input password ' , () => {
      expect(labelPassword.innerText).toEqual("Password");
    });

    it('should have the value of the input fields in the formgroup ' , () => {

      InputPhoneNo.value = phoneNoStub;
      inputPassword.value = passwordStub;

      inputPassword.dispatchEvent(inputEvent);
      InputPhoneNo.dispatchEvent(inputEvent);

      fixture.detectChanges();

      expect(phoneNoControl.value).toEqual(phoneNoStub);
      expect(passwordControl.value).toEqual(passwordStub);

    });

    it('should call the onSubmit method when form is submited ' , () => {

      let onSubmitSpy = spyOn(component ,'onSubmit');

      btnSubmit.click();

      expect(onSubmitSpy).toHaveBeenCalledTimes(1);

    });

    it('when onSubmit method is called it should call the userSignIn Method of docservice '  , () => {

      InputPhoneNo.value= phoneNoStub;
      inputPassword.value= passwordStub;

      InputPhoneNo.dispatchEvent(inputEvent);
      inputPassword.dispatchEvent(inputEvent);

      fixture.detectChanges();

      let formData: UserSignInFormData = {phoneNo: phoneNoStub , password: passwordStub};

      let userSignInSpy = docServiceMock.userSignIn;


      component.onSubmit();

      expect(userSignInSpy).toHaveBeenCalledTimes(1);
      expect(userSignInSpy).toHaveBeenCalledWith(formData);


    });




    describe('user name field validation test ' , () => {

      it('phoneNo field should not be empty and should show the error msg ' , () => {

        InputPhoneNo.value = "" ;

        InputPhoneNo.dispatchEvent(inputEvent);

        fixture.detectChanges();


        expect(phoneNoControl.valid).toEqual(false);
        expect(matErrorPhoneNo).toBeTruthy();
        expect(component.getPhoneNoError()).toEqual('Please Enter PhoneNo');
      } );

      it('phoneNo field should not be empty spcaes' , () => {

        InputPhoneNo.value = "    " ;

        InputPhoneNo.dispatchEvent(inputEvent);

        fixture.detectChanges();


        expect(phoneNoControl.valid).toEqual(false);
        expect(matErrorPhoneNo).toBeTruthy();
        expect(component.getPhoneNoError()).toEqual('Please Enter PhoneNo');

      } );

      it('phoneNo field should not have space in between ' , () => {
        InputPhoneNo.value = '012345  89';
        InputPhoneNo.dispatchEvent(inputEvent);

        fixture.detectChanges();

        expect(phoneNoControl.valid).toEqual(false);
        expect(matErrorPhoneNo).toBeTruthy();
        expect(matErrorPhoneNo.innerText).toEqual(`Invalid PhoneNo (ex- 0123456789)`);

      });

      it('phoneNo field should not have alphabets  in it ' , () => {
        InputPhoneNo.value = '0123asdfhto';
        InputPhoneNo.dispatchEvent(inputEvent);

        fixture.detectChanges();

        expect(phoneNoControl.valid).toEqual(false);
        expect(matErrorPhoneNo).toBeTruthy();
        expect(matErrorPhoneNo.innerText).toEqual(`Invalid PhoneNo (ex- 0123456789)`);
      });


      it('phoneNo field should not have symbols  in it ' , () => {
        InputPhoneNo.value = '0123456#$*';
        InputPhoneNo.dispatchEvent(inputEvent);

        fixture.detectChanges();

        expect(phoneNoControl.valid).toEqual(false);
        expect(matErrorPhoneNo).toBeTruthy();
        expect(matErrorPhoneNo.innerText).toEqual(`Invalid PhoneNo (ex- 0123456789)`);
      });

      it('phoneNo field should not have more than 10 digit  in it ' , () => {
        InputPhoneNo.value = '01234567891';
        InputPhoneNo.dispatchEvent(inputEvent);

        fixture.detectChanges();

        expect(phoneNoControl.valid).toEqual(false);
        expect(matErrorPhoneNo).toBeTruthy();
        expect(matErrorPhoneNo.innerText).toEqual(`Invalid PhoneNo (ex- 0123456789)`);
      });

      it('phoneNo field validation should be true when value is correct ' , () => {

        InputPhoneNo.value = phoneNoStub ;

        InputPhoneNo.dispatchEvent(inputEvent);

        fixture.detectChanges();


        expect(phoneNoControl.valid).toEqual(true);

      } );

    });


    describe('Password Input Validation Test ' , () => {


      it('pasword field should not be empty ' , () => {

        inputPassword.value = "";

        inputPassword.dispatchEvent(inputEvent);

        fixture.detectChanges();


        expect(passwordControl.valid).toEqual(false);
        expect(matErrorPassword).toBeTruthy();
        expect(matErrorPassword.innerText).toEqual('Please Enter Password');
      });


      it('pasword field should not be empty spaces' , () => {

        inputPassword.value = "      ";

        inputPassword.dispatchEvent(inputEvent);

        fixture.detectChanges();


        expect(passwordControl.valid).toEqual(false);
        expect(matErrorPassword).toBeTruthy();
        expect(matErrorPassword.innerText).toEqual('Please Enter Password');


      });

      it('pasword should not have space in it ' , () => {

        inputPassword.value = 'abc def ghti';

        inputPassword.dispatchEvent(inputEvent);

        fixture.detectChanges();


        expect(passwordControl.valid).toEqual(false);
        expect(matErrorPassword).toBeTruthy();
        expect(matErrorPassword.innerText).toEqual(`Password can't have space in it`);


      });




      it('pasword field should be valid when input is correct ' , () => {

        inputPassword.value = passwordStub;

        inputPassword.dispatchEvent(inputEvent);

        fixture.detectChanges();

        expect(passwordControl.valid).toEqual(true);
      });

    });



  });




});

import { UserSignInFormData } from './../formdata/user.signin.form';
import { DocService } from './../service/doc.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninComponent } from './signin.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';



fdescribe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;

  /** list of the dom element start */

  let inputUserName: HTMLInputElement ;
  let inputPassword: HTMLInputElement ;
  let btnSubmit: HTMLButtonElement ;
  let matErrorUserName: string ;
  let matErrorPassword ;


  /** list of dom elements ends  */

  /** list of formControl Start */

  let userNameControl: any;
  let passwordControl: any;

  /** list of formContorl Ends  */


  /** stub value start  */

  let userNameStub: string = 'ashutosh';
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
      inputUserName = el('[data-test="input-username"]');
      inputPassword = el('[data-test="input-password"]');
      btnSubmit = el('[data-test="btn-submit"]');
      matErrorUserName = el('[data-test="mat-error-username"]');
      matErrorPassword = el('[data-test="mat-error-password"]');

      userNameControl = component.signInFormGroup.controls['userName'];
      passwordControl = component.signInFormGroup.controls['password'];
    });

    it('should render the signin form ' , () => {

      expect(inputUserName).toBeTruthy();
      expect(inputPassword).toBeTruthy();
      expect(btnSubmit).toBeTruthy();

      expect(inputUserName.type).toEqual("text");
      expect(inputPassword.type).toEqual("password");
      expect(btnSubmit.type).toEqual("submit");

    });

    it('should have the value of the input fields in the formgroup ' , () => {

      inputUserName.value = userNameStub;
      inputPassword.value = passwordStub;

      inputPassword.dispatchEvent(inputEvent);
      inputUserName.dispatchEvent(inputEvent);

      fixture.detectChanges();

      expect(userNameControl.value).toEqual(userNameStub);
      expect(passwordControl.value).toEqual(passwordStub);

    });

    it('should call the onSubmit method when form is submited ' , () => {

      let onSubmitSpy = spyOn(component ,'onSubmit');

      btnSubmit.click();

      expect(onSubmitSpy).toHaveBeenCalledTimes(1);

    });

    it('when onSubmit method is called it should call the userSignIn Method of docservice '  , () => {

      inputUserName.value= userNameStub;
      inputPassword.value= passwordStub;

      inputUserName.dispatchEvent(inputEvent);
      inputPassword.dispatchEvent(inputEvent);

      fixture.detectChanges();

      let formData: UserSignInFormData = {userName: userNameStub , password: passwordStub};

      let userSignInSpy = docServiceMock.userSignIn;


      component.onSubmit();

      expect(userSignInSpy).toHaveBeenCalledTimes(1);
      expect(userSignInSpy).toHaveBeenCalledWith(formData);


    });


    describe('user name field validation test ' , () => {

      it('username field should not be empty and should show the error msg ' , () => {

        inputUserName.value = "" ;

        inputUserName.dispatchEvent(inputEvent);

        fixture.detectChanges();


        expect(userNameControl.valid).toEqual(false);
        expect(matErrorUserName).toBeTruthy();
        expect(component.getUserNameError()).toEqual('Please Enter UserName');
      } );

      it('username field should not be empty spcaes' , () => {

        inputUserName.value = "    " ;

        inputUserName.dispatchEvent(inputEvent);

        fixture.detectChanges();


        expect(userNameControl.valid).toEqual(false);
        expect(matErrorUserName).toBeTruthy();
        expect(component.getUserNameError()).toEqual('Please Enter UserName');

      } );

      it('username field validation should be true when value is correct ' , () => {

        inputUserName.value = userNameStub ;

        inputUserName.dispatchEvent(inputEvent);

        fixture.detectChanges();


        expect(userNameControl.valid).toEqual(true);

      } );

    });


    describe('Password Input Validation Test ' , () => {


      it('pasword field should not be empty ' , () => {

        inputPassword.value = "";

        inputPassword.dispatchEvent(inputEvent);

        fixture.detectChanges();


        expect(passwordControl.valid).toEqual(false);
        expect(matErrorPassword).toBeTruthy();
        expect(component.getPasswordError()).toEqual('Please Enter Password');
      });


      it('pasword field should not be empty spaces' , () => {

        inputPassword.value = "      ";

        inputPassword.dispatchEvent(inputEvent);

        fixture.detectChanges();


        expect(passwordControl.valid).toEqual(false);

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

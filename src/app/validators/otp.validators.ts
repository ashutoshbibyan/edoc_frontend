import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
/**
 * Validator for the Otp it checks that otp contains only
 * four digit of number
 */

export function otpValidator() : ValidatorFn  {

  return (control: AbstractControl): null | ValidationErrors => {
    return (control.value.match(/^[0-9]{4}$/)) ? null : {'Invalid Otp' : true};
  };
 }

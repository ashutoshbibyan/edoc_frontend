import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
/**
 * Phone no validator is a custom validator which check the phone no is
 * in correct format
 */

export function phoneValidator(): ValidatorFn{
   return (control: AbstractControl): null | ValidationErrors => {

    return (control.value.match(/^[0-9]{10}$/)) ? null : {'PhoneNo Invalid' : true } ;

   }
 }

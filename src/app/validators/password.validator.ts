import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
/**
 * Password validator is to validate the password input by user
 *
 */

export function passwordValidator() :  ValidatorFn {
   return (control: AbstractControl): null | ValidationErrors => {

    return (control.value.match(/^\S*$/))? null : {'Invalid Password' : true} ;

  }
}

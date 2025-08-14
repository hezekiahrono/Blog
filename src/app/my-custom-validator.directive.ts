import { Directive, forwardRef, Input, Provider } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

const CUSTOM_VALIDATOR: Provider = {
          provide: NG_VALIDATORS,
          useExisting: forwardRef(() => MyCustomValidatorDirective),
          multi: true
        };
@Directive({
  selector: '[myCustomValidator]'
})


export class MyCustomValidatorDirective implements Validator{
   @Input('myCustomValidator') validatorConfig: any;

  constructor() { }
  validate(control: AbstractControl): ValidationErrors | null {

     const value = control.value;
           
            if (this.validatorConfig && this.validatorConfig.mustContain && !value.includes(this.validatorConfig.mustContain)) {
      return { 'mustContainError': { requiredPart: this.validatorConfig.mustContain } };
    }

    return null;
          }
}

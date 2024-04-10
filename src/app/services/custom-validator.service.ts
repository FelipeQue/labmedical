import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class CustomValidatorService {

  constructor() { }

  fullName(): ValidatorFn {
    return (control: AbstractControl):
      ValidationErrors | null => {
      const value = control.value;
      if (value == null) {
        return null;
      };

      const names: Array<string> = control.value.split(' ');
      if (names.length < 2 || names[0].length < 2 || names[1].length < 2) {
        return { fullName: true };
      };
      return null;
    };
  };
};

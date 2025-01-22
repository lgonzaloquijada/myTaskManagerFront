import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function MatchValidator(source: string, target: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const sourceControl = control.get(source);
    const targetControl = control.get(target);

    if (sourceControl?.value !== targetControl?.value) {
      sourceControl?.setErrors({ ...sourceControl.errors, mismatch: true });
      return { mismatch: true };
    }

    return null;
  };
}

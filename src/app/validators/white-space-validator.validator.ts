import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

export class WhiteSpaceValidator {
  static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
    if ((control.value as string).indexOf(' ') >= 0) {
      return { noWhiteSpace: true };
    }

    return null;
  }

  static trimFields(controls: any) {
    Object.values(controls).forEach((control: any) => {
      control.setValue(control.value.trim() || null);
    });
  }
}

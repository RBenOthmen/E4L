import { AbstractControl } from '@angular/forms';

export class BirthDateValidators {
  static validBirthDate(control: AbstractControl) {
    return new Promise((resolve) => {
      let now = new Date();
      let fullDate = new Date();
      console.log(now.getFullYear());
      console.log(fullDate.getUTCDate());
      console.log(fullDate);
      console.log(now);

      console.log(+control.value.substring(0, 4) > now.getFullYear() + 9);

      if (+control.value.substring(0, 4) > now.getFullYear() + 9)
        resolve({ invalidBirthDate: true });
      else resolve(null);
    });
  }

  // export class PasswordValidators {
  //     static validOldPassword(control: AbstractControl) {
  //         return new Promise((resolve) => {
  //             if (control.value !== '1234')
  //                 resolve({ invalidOldPassword: true });
  //             else
  //                 resolve(null);
  //         });
  //     }

  // static passwordsShouldMatch(control: AbstractControl) {
  //     let newPassword = control.get('newPassword');
  //     let confirmPassword = control.get('confirmPassword');

  //     if (newPassword?.value !== confirmPassword?.value)
  //         return { passwordsShouldMatch: true };

  //     return null;
  // }
}

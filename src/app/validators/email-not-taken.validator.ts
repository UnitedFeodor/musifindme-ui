import { AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable, map, catchError, of } from "rxjs";
import { UserService } from "../services/user.service";

export class EmailNotTakenValidator {
    static createValidator(userService: UserService): (control: AbstractControl) => Observable<ValidationErrors | null> {
      return (control: AbstractControl): Observable<ValidationErrors | null> => {
        const email = control.value;
        return userService.getUserByEmail(email).pipe(
          map(user => (user ? { emailTaken: true } : null)),
          catchError(() => of(null))
        );
      };
    }
  }
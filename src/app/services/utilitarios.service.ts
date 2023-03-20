import { Injectable } from "@angular/core";
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup } from "@angular/forms";

@Injectable()
export class Utilitarios {

    public static validateAllFormFields(
        formGroup: UntypedFormGroup | UntypedFormArray
    ) {
        Object.keys(formGroup.controls).forEach((field) => {
            const control = formGroup.get(field);
            if (control instanceof UntypedFormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (
                control instanceof UntypedFormGroup ||
                control instanceof UntypedFormArray
            ) {
                this.validateAllFormFields(control);
            }
        });
    }

}

export const Masks = {
    cepMask: [
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        "-",
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
    ],
};
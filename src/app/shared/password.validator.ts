import { AbstractControl } from '@angular/forms';

export function PasswordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword= control.get('repassword');
    return password && confirmPassword && password.value!==confirmPassword.value?
    {'misMatch':true}:null;
}



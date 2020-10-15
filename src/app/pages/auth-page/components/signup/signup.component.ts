import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { K_REGEX } from 'src/app/core/constants/general';
import { AuthService } from 'src/app/core/services/auth.service';
import { ISignupPayload } from 'src/app/core/interfaces/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.pattern(K_REGEX.USERNAME)]],
    email: ['', [Validators.required, Validators.pattern(K_REGEX.EMAIL)]],
    password: ['', [Validators.required, Validators.pattern(K_REGEX.PASSWORD)]],
    re_passwod: ['', [Validators.required, ]]
  }, {
    validators: this.MatchConfirom('password', 're_passwod')
  })

  backend_validation: {username: string[], email: string[], password: string[]} = {
    username: [],
    email: [],
    password: []
  }

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.logout()
  }

  async onSubmit(): Promise<void> {
    const payload = this.form.value;
    delete payload.re_passwod

    try{
      const res = await this.authService.signup(payload).toPromise()
      this.authService.setToken(res.access)
      this.router.navigate(['/timeline'])
    }catch(e){
      this.backend_validation = e.error
    }
  }

  MatchConfirom(field1: any, field2: any) {

    return (checkForm: FormGroup) => {
      let value1 = checkForm.controls[field1];
      let value2 = checkForm.controls[field2];
      if (value1.value === value2.value ) {
        return value2.setErrors(null);
      } else {
        return value2.setErrors({ notEquivalent: true });
      }
    };
  }

}

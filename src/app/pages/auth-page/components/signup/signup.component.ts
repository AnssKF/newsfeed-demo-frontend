import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { K_REGEX } from 'src/app/core/constants/general';

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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.form.value);
    
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

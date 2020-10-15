import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { K_REGEX } from 'src/app/core/constants/general';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(K_REGEX.EMAIL)]],
    password: ['', [Validators.required, Validators.pattern(K_REGEX.PASSWORD)]]
  })

  backend_validation: {email: string[], password: string[]} = {
    email: [],
    password: []
  }

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.logout()
  }

  async onSubmit(): Promise<void> {
    try{
      const res = await this.authService.login(this.form.value).toPromise()
      this.authService.setToken(res.access)
      this.router.navigate(['/timeline'])
    }catch(e){
      this.backend_validation = e.error
    }
  }

}

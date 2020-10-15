import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field-error-msg',
  templateUrl: './form-field-error-msg.component.html',
  styleUrls: ['./form-field-error-msg.component.scss']
})
export class FormFieldErrorMsgComponent implements OnInit {

  @Input() errors: string[] = []
  @Input() default: string= 'This Field Is Not Valid.'
  @Input() control: FormControl

  constructor() { }

  ngOnInit(): void {
  }

}

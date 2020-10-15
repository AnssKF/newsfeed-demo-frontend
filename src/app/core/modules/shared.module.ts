import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldErrorMsgComponent } from '../components/form-field-error-msg/form-field-error-msg.component';



@NgModule({
  declarations: [
    FormFieldErrorMsgComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormFieldErrorMsgComponent
  ]
})
export class SharedModule { }

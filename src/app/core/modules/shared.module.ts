import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldErrorMsgComponent } from '../components/form-field-error-msg/form-field-error-msg.component';
import { PostCardComponent } from '../components/post-card/post-card.component'


@NgModule({
  declarations: [
    FormFieldErrorMsgComponent,
    PostCardComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormFieldErrorMsgComponent,
    PostCardComponent,
  ]
})
export class SharedModule { }

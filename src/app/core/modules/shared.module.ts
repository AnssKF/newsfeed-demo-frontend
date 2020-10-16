import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldErrorMsgComponent } from '../components/form-field-error-msg/form-field-error-msg.component';
import { PostCardComponent } from '../components/post-card/post-card.component'
import { PostFormComponent } from '../components/post-form/post-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FormFieldErrorMsgComponent,
    PostCardComponent,
    PostFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    FormFieldErrorMsgComponent,
    PostCardComponent,
    PostFormComponent,

    ReactiveFormsModule
  ]
})
export class SharedModule { }

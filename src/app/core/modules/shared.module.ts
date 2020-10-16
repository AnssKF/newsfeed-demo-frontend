import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldErrorMsgComponent } from '../components/form-field-error-msg/form-field-error-msg.component';
import { PostCardComponent } from '../components/post-card/post-card.component'
import { PostFormComponent } from '../components/post-form/post-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommentFormComponent } from '../components/comment-form/comment-form.component';


@NgModule({
  declarations: [
    FormFieldErrorMsgComponent,
    PostCardComponent,
    PostFormComponent,
    CommentFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    FormFieldErrorMsgComponent,
    PostCardComponent,
    PostFormComponent,
    CommentFormComponent,

    ReactiveFormsModule
  ]
})
export class SharedModule { }

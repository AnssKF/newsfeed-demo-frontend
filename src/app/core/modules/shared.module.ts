import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldErrorMsgComponent } from '../components/form-field-error-msg/form-field-error-msg.component';
import { PostCardComponent } from '../components/post-card/post-card.component'
import { PostFormComponent } from '../components/post-form/post-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommentFormComponent } from '../components/comment-form/comment-form.component';
import { NavBarComponent } from '../components/nav-bar/nav-bar.component';
import { LayoutComponent } from '../components/layout/layout.component';
import { AuthService } from '../services/auth.service';
import { RouterModule } from '@angular/router';
import { PostService } from '../services/post.service';


@NgModule({
  declarations: [
    FormFieldErrorMsgComponent,
    PostCardComponent,
    PostFormComponent,
    CommentFormComponent,
    NavBarComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    FormFieldErrorMsgComponent,
    PostCardComponent,
    PostFormComponent,
    CommentFormComponent,
    NavBarComponent,
    LayoutComponent,

    ReactiveFormsModule,
    RouterModule
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        AuthService,
        PostService
      ],
    };
  }
}

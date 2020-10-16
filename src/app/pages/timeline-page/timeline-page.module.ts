import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimelinePageComponent } from './timeline-page.component';
import { RouterModule, Routes } from '@angular/router';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';

const ROUTES: Routes = [
  {
    path: '',
    component: TimelinePageComponent,
    children: [
      {
        path: '',
        component: PostsListComponent
      },
      {
        path: ':id',
        component: PostDetailsComponent
      }
    ]
  }
]

@NgModule({
  declarations: [TimelinePageComponent, PostsListComponent, PostDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class TimelinePageModule { }

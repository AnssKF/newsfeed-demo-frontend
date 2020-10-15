import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimelinePageComponent } from './timeline-page.component';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
  {
    path: '',
    component: TimelinePageComponent,
  }
]

@NgModule({
  declarations: [TimelinePageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class TimelinePageModule { }

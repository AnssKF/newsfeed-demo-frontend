import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth-page/auth-page.module').then(m => m.AuthPageModule)
  },
  {
    path: 'timeline',
    loadChildren: () => import('./pages/timeline-page/timeline-page.module').then(m => m.TimelinePageModule)
  },
  {
    path: '',
    redirectTo: '/timeline',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'timeline'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

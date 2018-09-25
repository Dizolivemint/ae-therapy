import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageHomeComponent } from './page-home/page-home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PageAboutComponent } from './page-about/page-about.component';
import { PageClientComponent } from './page-client/page-client.component';
import { PageExperienceComponent } from './page-experience/page-experience.component';
import { PageTherapyComponent } from './page-therapy/page-therapy.component';

const routes: Routes = [  
  {
    path: '',
    component: PageHomeComponent
  }
  ,{
    path: 'past',
    children: [{
      path: 'experience',
      component: PageExperienceComponent
    },{
      path: 'about',
      component: PageAboutComponent
    },{
      path: '',
      redirectTo: 'experience',
      pathMatch: 'full'
    }]
  },
  {
    path: 'therapy',
    component: PageTherapyComponent
  },
  {
    path: 'clientelle',
    component: PageClientComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

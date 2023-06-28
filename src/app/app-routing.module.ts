import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { HomeHeaderComponent } from './components/common/home-header/home-header.component';
import { InvestorSpaceComponent } from './components/investor/investor-space.component';
import { StartuperSpaceComponent } from './components/startuper/startuper-space.component';
import { ProjectForInvestorComponent } from './components/investor/project-for-investor/project-for-investor.component';
import { ProjectForStartuperComponent } from './components/startuper/project-for-startuper/project-for-startuper.component';
import { StartuperForInvestorComponent } from './components/investor/startuper-for-investor/startuper-for-investor.component';
import { InvestorForStartuperComponent } from './components/startuper/investor-for-startuper/investor-for-startuper.component';
import { StartuperForStartuperComponent } from './components/startuper/startuper-for-startuper/startuper-for-startuper.component';
import { ProjectSpaceComponent } from './components/startuper/project-space/project-space.component';

const routes: Routes = [
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  {
    path: 'homepage', component: HomePageComponent
  },
  {
    path: 'investor', component: InvestorSpaceComponent,
    children: [
      { path: '', redirectTo: 'project', pathMatch: 'full' },
      {
        path: 'project', component: ProjectForInvestorComponent
      },
      {
        path: 'startuper', component: StartuperForInvestorComponent
      },
    ]
  },
  {
    path: 'startuper', component: StartuperSpaceComponent,
    children: [
      { path: '', redirectTo: 'project', pathMatch: 'full' },
      {
        path: 'project', component: ProjectForStartuperComponent
      },
      {
        path: 'investor', component: InvestorForStartuperComponent
      },
      {
        path: 'startuper/:mode', component: StartuperForStartuperComponent
      },
      {
        path: 'project-space/:projectId', component: ProjectSpaceComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

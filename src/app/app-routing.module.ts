import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { HomeHeaderComponent } from './components/common/home-header/home-header.component';
import { ProfileComponent } from './components/common/profile/profile.component';
import { InvestorSpaceComponent } from './components/investor/investor-space.component';
import { StartuperSpaceComponent } from './components/startuper/startuper-space.component';
import { HistorySearchComponent } from './components/startuper/history-search/history-search.component';
import { ProjectForInvestorComponent } from './components/investor/project-for-investor/project-for-investor.component';
import { ProjectForStartuperComponent } from './components/startuper/project-for-startuper/project-for-startuper.component';
import { StartuperForInvestorComponent } from './components/investor/startuper-for-investor/startuper-for-investor.component';
import { InvestorForStartuperComponent } from './components/startuper/investor-for-startuper/investor-for-startuper.component';
import { StartuperForStartuperComponent } from './components/startuper/startuper-for-startuper/startuper-for-startuper.component';
import { ProjectSpaceComponent } from './components/startuper/project-space/project-space.component';
import { ChatComponent } from './components/chat/chat.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { AdminRegisterComponent } from './components/admin/admin-register/admin-register.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { ListAdminComponent } from './components/admin/admin-home/list-admin/list-admin.component';
import { ListProjectComponent } from './components/admin/admin-home/list-project/list-project.component';
import { ListStartuperComponent } from './components/admin/admin-home/list-startuper/list-startuper.component';
import { HomePageNewComponent } from './components/home-page-new/home-page-new.component';

const routes: Routes = [
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  {
    path: 'homepage', component: HomePageNewComponent
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
      {
        path: 'chat/:conversationId', component: ChatComponent
      }
    ]
  },
  {
    path: 'profile', component: ProfileComponent
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
      },
      {
        path: 'chat/:mode/:id', component: ChatComponent
      },
      {
        path: 'history-search', component: HistorySearchComponent
      },
    ]
  },
  {
    path: 'admin', component: AdminComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: AdminLoginComponent },
      { path: 'register', component: AdminRegisterComponent },
      {
        path: 'home', component: AdminHomeComponent,
        children: [
          { path: '', redirectTo: 'project', pathMatch: 'full' },
          { path: 'project', component: ListProjectComponent },
          { path: 'startuper', component: ListStartuperComponent },
          { path: 'admin', component: ListAdminComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', useHash: true })],
  // imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

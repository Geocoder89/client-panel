import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddClientComponent } from './components/add-client/add-client.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { ClientsComponent } from './components/clients/clients.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { ErrorsComponent } from './components/errors/errors.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
// routing guard

import { AuthguardGuard } from './guards/authguard.guard';
import { RegisterGuard } from './guards/register.guard';
const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthguardGuard] },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [RegisterGuard],
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'client/add',
    component: AddClientComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: 'clients',
    component: ClientsComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: 'client/:id',
    component: ClientDetailsComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: 'client/edit/:id',
    component: EditClientComponent,
    canActivate: [AuthguardGuard],
  },
  { path: '**', component: ErrorsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

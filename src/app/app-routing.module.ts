import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuestManagementComponent } from './components/guest-management/guest-management.component';
import { GuestComponent } from './components/guest/guest.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

import { AuthGuard } from './shared/guard/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DetailsInviteSentComponent } from './components/details-invite-sent/details-invite-sent.component';
import { DetailsInviteSentWithoutResponseComponent } from './components/details-invite-sent-without-response/details-invite-sent-without-response.component';
import { DetailsInviteConfirmedYesComponent } from './components/details-invite-confirmed-yes/details-invite-confirmed-yes.component';
import { DetailsInviteConfirmedNoComponent } from './components/details-invite-confirmed-no/details-invite-confirmed-no.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: 'guest-management', component: GuestManagementComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'detailsInviteSent', component: DetailsInviteSentComponent, canActivate: [AuthGuard]},
  { path: 'detailsInviteSentWithoutResponse', component: DetailsInviteSentWithoutResponseComponent, canActivate: [AuthGuard]},
  { path: 'detailsInviteConfirmedYes', component: DetailsInviteConfirmedYesComponent, canActivate: [AuthGuard]},
  { path: 'detailsInviteConfirmedNo', component: DetailsInviteConfirmedNoComponent, canActivate: [AuthGuard]},
  { path: 'guest/:id', component: GuestComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

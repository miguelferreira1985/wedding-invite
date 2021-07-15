import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GuestComponent } from './components/guest/guest.component';
import { GuestManagementComponent } from './components/guest-management/guest-management.component';

import { environment } from './../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AuthService } from './shared/services/auth.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { DetailsInviteSentComponent } from './components/details-invite-sent/details-invite-sent.component';
import { DetailsInviteSentWithoutResponseComponent } from './components/details-invite-sent-without-response/details-invite-sent-without-response.component';
import { DetailsInviteConfirmedYesComponent } from './components/details-invite-confirmed-yes/details-invite-confirmed-yes.component';
import { DetailsInviteConfirmedNoComponent } from './components/details-invite-confirmed-no/details-invite-confirmed-no.component';

@NgModule({
  declarations: [
    AppComponent,
    GuestComponent,
    GuestManagementComponent,
    LoginComponent,
    ForgotPasswordComponent,
    DashboardComponent,
    DetailsInviteSentComponent,
    DetailsInviteSentWithoutResponseComponent,
    DetailsInviteConfirmedYesComponent,
    DetailsInviteConfirmedNoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ],
  providers: [ 
    AuthService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit } from '@angular/core';
import { Guest } from 'src/app/models/guest.model';
import { GuestService } from 'src/app/services/guest.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-details-invite-confirmed-yes',
  templateUrl: './details-invite-confirmed-yes.component.html',
  styleUrls: ['./details-invite-confirmed-yes.component.css']
})
export class DetailsInviteConfirmedYesComponent implements OnInit {

  guests: Guest[] = [];

  inviteURL = environment.inviteURL;

  constructor( private guestService: GuestService,
                public authService: AuthService) {

    let invites: Guest[] = [];

    this.guestService.getGuestList()
            .subscribe( resp => {
                this.guests = resp;
    });
  }

 updateInviteStatus( guest: Guest ) {

  if( guest.inviteStatus === "Sin Enviar") {

    guest.inviteStatus = "Enviado";

  }
          
  this.guestService.updateGuest(guest, guest.id);
              
  }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { Guest } from 'src/app/models/guest.model';
import { GuestService } from 'src/app/services/guest.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-details-invite-confirmed-no',
  templateUrl: './details-invite-confirmed-no.component.html',
  styleUrls: ['./details-invite-confirmed-no.component.css']
})
export class DetailsInviteConfirmedNoComponent implements OnInit {

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
          
    this.guestService.updateGuest(guest, guest.id);
              
  }              

  ngOnInit(): void {
  }

}

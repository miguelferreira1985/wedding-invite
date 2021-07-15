import { Component, OnInit } from '@angular/core';
import { Guest } from '../../models/guest.model';
import { environment } from '../../../environments/environment.prod';
import { GuestService } from '../../services/guest.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-details-invite-sent',
  templateUrl: './details-invite-sent.component.html',
  styleUrls: ['./details-invite-sent.component.css']
})
export class DetailsInviteSentComponent implements OnInit {

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

                  guest.inviteStatus = 'Enviado';
                        
                  this.guestService.updateGuest(guest, guest.id);
                            
                } 

  ngOnInit(): void {
  }

}

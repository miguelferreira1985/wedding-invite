import { Component, OnInit } from '@angular/core';
import { Guest } from 'src/app/models/guest.model';
import { GuestService } from 'src/app/services/guest.service';
import { AuthService } from '../../shared/services/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  guests: Guest[] = [];

  constructor( public authService: AuthService, private guestService: GuestService ) {

    this.guestService.getGuestList()
    .subscribe( resp => {
      this.guests = resp;
    });

   }

   getTotalAdults(): number{
    let adults: number = 0;

    this.guests.forEach(function ( guest ) {
        adults = adults + parseInt(guest.adults);
    });

    return adults;
   }

   getTotalChilds(): number{
    let childs: number = 0;

    this.guests.forEach(function ( guest ) {
        childs = childs + parseInt(guest.childs);
    });

    return childs;
  }

   getTotalGuests() :number{
     return this.getTotalAdults() + this.getTotalChilds();
  }

  getTotalNotSent(): number{
    let totalNotSent: number = 0;

    this.guests.forEach(function ( guest ) {
      if ( guest.inviteStatus === 'Sin Enviar' || guest.inviteStatus[0] === 'Sin Enviar' ){
          totalNotSent = totalNotSent + 1;
      }
  });

    return totalNotSent;
  }

  getTotalSent(): number{
    let totalSent: number = 0;

    this.guests.forEach(function ( guest ) {
      if ( guest.inviteStatus === 'Enviado' || guest.inviteStatus[0] === 'Enviado' || guest.inviteStatus === 'Asistira' || 
            guest.inviteStatus[0] === 'Asistira' || guest.inviteStatus === 'No Asistira' || guest.inviteStatus[0] === 'No Asistira' ){
          totalSent = totalSent + 1;
      }
  });

    return totalSent;
  }

  getTotalSentWithoutResponse(): number{
    let totalSent: number = 0;

    this.guests.forEach(function ( guest ) {
      if ( guest.inviteStatus === 'Enviado' || guest.inviteStatus[0] === 'Enviado' ){
          totalSent = totalSent + 1;
      }
    });

    return totalSent;
  }

  getTotalChildsPositiveAsistance(): number{
    let total: number = 0;

    this.guests.forEach(function ( guest ) {
      if ( guest.inviteStatus === 'Asistira' || guest.inviteStatus[0] === 'Asistira' ){
          total = total + parseInt(guest.childs);
      }
    });

    return total;
  }

  getTotalAdultsPositiveAsistance(): number{
    let total: number = 0;

    this.guests.forEach(function ( guest ) {
      if ( guest.inviteStatus === 'Asistira' || guest.inviteStatus[0] === 'Asistira' ){
          total = total + parseInt(guest.adults);
      }
    });

    return total;
  }

  getTotalPositiveAsistance(): number{
    return this.getTotalAdultsPositiveAsistance() + this.getTotalChildsPositiveAsistance();
  }

  getTotalChildsNegativeAsistance(): number{
    let total: number = 0;

    this.guests.forEach(function ( guest ) {
      if ( guest.inviteStatus === 'No Asistira' || guest.inviteStatus[0] === 'No Asistira' ){
          total = total + parseInt(guest.childs);
      }
    });
    return total;
  }

  getTotalAdultsNegativeAsistance(): number{
    let total: number = 0;

    this.guests.forEach(function ( guest ) {
      if ( guest.inviteStatus === 'No Asistira' || guest.inviteStatus[0] === 'No Asistira' ){
          total = total + parseInt(guest.adults);
      }
    });
    return total;
  }

  getTotalNegativeAsistance(): number{
    return this.getTotalAdultsNegativeAsistance() + this.getTotalChildsNegativeAsistance();
  }

  ngOnInit(): void {
  }

}

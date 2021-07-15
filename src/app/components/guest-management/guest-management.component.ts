import { Component, OnInit } from '@angular/core';
import { GuestService } from '../../services/guest.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Guest } from './../../models/guest.model';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-guest-management',
  templateUrl: './guest-management.component.html',
  styleUrls: ['./guest-management.component.css']
})
export class GuestManagementComponent implements OnInit {

  public guestForm: FormGroup;
  guests: Guest[] = [];


  inviteURL = environment.inviteURL;

  constructor( private guestService: GuestService,
                private formBuilder: FormBuilder,
                public authService: AuthService,
                private router: Router
  ) {

    this.guestService.getGuestList()
    .subscribe( resp => {
      this.guests = resp;
    });

      this.createGuestForm();

   }

  ngOnInit(): void {

  }

  createGuestForm() {
    this.guestForm = this.formBuilder.group({
      id: [''],
      name: [''],
      phone: [''],
      adults: ['1'],
      childs: ['0'],
      inviteStatus: ['Sin Enviar']
    })
  }

  clearForm() {
    this.guestForm.reset({
      id: [''],
      name: [''],
      phone: [''],
      adults: ['1'],
      childs: ['0'],
      inviteStatus: ['Sin Enviar']
    });
  }

  fillForm( guest: Guest) {
    this.guestForm.reset({
      id: guest.id,
      name: guest.name,
      phone: guest.phone,
      adults: guest.adults,
      childs: guest.childs,
      inviteStatus: guest.inviteStatus
    });
  }

  updateInviteStatus( guest: Guest ) {

    guest.inviteStatus = "Enviado";

    this.guestService.updateGuest(guest, guest.id);

  }

  onSubmit( value) {
    
    if ( this.guestForm.invalid) {
      return;
    }

    let guest: Guest;

    let user = JSON.parse(localStorage.getItem('user'));

    guest = {
      id: value.id,
      name: value.name,
      phone: value.phone,
      adults: value.adults,
      childs: value.childs,
      inviteStatus: value.inviteStatus
    }

    if ( value.id == '' ) {

      console.log(user.email);

      this.guestService.createGuest( guest );

      this.clearForm();

    } else {
      
      this.guestService.updateGuest( guest, guest.id )
        .then( resp => {

          Swal.fire({
            title: 'El invitado se editó correctamente.',
            icon: 'success',
            position: 'center',
            showConfirmButton: false,
            timer: 2000
          });

        }).catch( err => {

          Swal.fire({
            title: 'El invitado NO se editó correctamente, intente nuevament.',
            icon: 'error',
            position: 'center',
            showConfirmButton: false,
            timer: 2000
          });

        });

        this.clearForm();
    }

  }

  removeGuest( guest: Guest ) {

    Swal.fire({
      title: `¿Esta seguro que desea eliminar al invitado ${ guest.name.toUpperCase() }?`,
      text: 'Esta acción es permanente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      allowOutsideClick: false
    }).then( res => {

      if( res.isConfirmed ) {

        this.guestService.deleteGuest( guest )
            .then( resp => {
            
            Swal.fire('¡Invitado eliminado!', 'El invitado se eliminó correctamente.', 'success');

          }).catch( err => {

            Swal.fire('¡Invitado NO eliminado!', 'El invitado NO se eliminó correctamente.', 'error');

          });
      }

      this.clearForm();
    });

  }

}

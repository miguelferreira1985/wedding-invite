import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Guest } from './../models/guest.model';
import { map} from 'rxjs/operators';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class GuestService {

  private guestsCollection: AngularFirestoreCollection<Guest>;

  private guests: Guest[] = [];

  constructor( private angularFirestore: AngularFirestore ) { }

  getGuest( id ) {
    return this.angularFirestore
      .collection( 'guest-collection' )
      .doc( id )
      .valueChanges();
  }

  getGuestList() { 

    this.guestsCollection = this.angularFirestore.collection('guest-collection');

    return this.guestsCollection.snapshotChanges()
            .pipe(
              map( resp => {
                return resp.map( a => {
                  const data = a.payload.doc.data() as Guest;
                  data.id = a.payload.doc.id;
                  return data;
                });
              }));
  }

  createGuest( guest: Guest ) {

    if( guest.inviteStatus === "" ) {
      guest.inviteStatus = "Sin Enviar";
    }

    return new Promise<any>((resolve, reject) => {
      this.angularFirestore
        .collection( 'guest-collection' )
        .add( guest )
        .then( 
          response => { 
            Swal.fire({
              title: 'El invitado se agregó correctamente.',
              icon: 'success',
              position: 'center',
              showConfirmButton: false,
              timer: 2000
            });
          }, 
            error => reject( error => {
              Swal.fire({
                title: 'El invitado NO se agregó correctamente.',
                icon: 'error',
                position: 'center',
                showConfirmButton: false,
                timer: 2000
              });
            }));
    });
  }

  deleteGuest( guest: Guest ) {
    return this.angularFirestore
      .collection( 'guest-collection')
      .doc( guest.id )
      .delete();
  }

  updateGuest( guest: Guest, id ) {
    return this.angularFirestore
      .collection( 'guest-collection' )
      .doc( id )
      .update({
        name: guest.name,
        phone: guest.phone,
        adults: guest.adults,
        childs: guest.childs,
        inviteStatus: guest.inviteStatus
      });
  }

}



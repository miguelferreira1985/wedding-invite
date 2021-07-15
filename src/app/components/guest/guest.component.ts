import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { GuestService } from '../../services/guest.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router'
import { Guest } from 'src/app/models/guest.model';
import Swal from 'sweetalert2';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {

  id: String;

  _guest: any;

  images: String[] = ['assets/Foto_Anillo.jpeg', 'assets/Foto2.jpg', 'assets/Foto3.jpg', 'assets/Foto6.jpeg', 'assets/Foto8.jpeg',
                      'assets/Foto9.jpeg', 'assets/Foto10.jpeg', 'assets/Foto11.jpeg', 'assets/Foto12.jpeg', 'assets/Foto13.jpeg', 'assets/Foto14.jpeg', 'assets/Foto16.jpeg',
                    'assets/Foto17.jpeg', 'assets/Foto_Anillo.jpeg'];

  second: number = 1000;
  minute: number = this.second * 60;
  hour: number = this.minute * 60;
  day: number = this.hour * 24;
  end: any;
  now: any;
  days: any;
  hours: any;
  minutes: any;
  seconds: any;
  source = timer(0, 1000);
  clock: any;

  constructor( private guestService: GuestService,
                private act: ActivatedRoute,
                private router: Router,
                private config: NgbCarouselConfig
                 ) {

      this.id = this.act.snapshot.paramMap.get('id');

      this.guestService.getGuest(this.id).subscribe(res => {
          this._guest = res;
          console.log(this._guest);
      });  

      config.interval = 4000;
      config.wrap = true;
      config.keyboard = true;
      config.pauseOnHover = false;
      config.showNavigationArrows = false;
      config.showNavigationIndicators = false;

   }

  ngOnInit(): void {

    this.clock = this.source.subscribe( t => {
      this.now = new Date();
      this.end = new Date('11/07/2021' +' 14:00');
      this.showDate();
    });

  }
 
  confirmAsistance(adults, childs) {

    let guest = new Guest();
    
    Object.assign(guest, this._guest);

    guest.adults = adults;
    guest.childs = childs;
    guest.inviteStatus = "Asistira";

    this.guestService.updateGuest(guest, this.id)
      .then( resp => {
        
        Swal.fire({
          title: 'Será un gusto que nos acompañes ese día.',
          text: '¡Muchas gracias por confirma!',
          icon: 'success',
          position: 'center',
          showConfirmButton: false,
          timer: 3000
        });

      });

  }

  negativeAsistance(){

    let guest = new Guest();
    
    Object.assign(guest, this._guest);

    guest.inviteStatus = "No Asistira";

    this.guestService.updateGuest(guest, this.id)
    .then( resp => {
      
      Swal.fire({
        title: 'Es una lastima que no puedan acompañarnos.',
        text: '¡Muchas gracias por confirma!',
        icon: 'success',
        position: 'center',
        showConfirmButton: false,
        timer: 3000
      });

    });

  }

  showDate() {
    let distance = this.end - this.now;

    if( distance == 0 || distance < 0) {

      this.days = 0;
      this.hours = 0;
      this.minutes = 0;
      this.seconds = 0;

    } else {

      this.days = Math.floor(distance / this.day);
      this.hours = Math.floor((distance % this.day) / this.hour);
      this.minutes = Math.floor((distance % this.hour) / this.minute);
      this.seconds = Math.floor((distance % this.minute) / this.second);

    }
  }

}

import { Component } from '@angular/core';
import { Reservation } from '../commande/Reservation';

@Component({
  selector: 'app-liste-demande-tch',
  templateUrl: './liste-demande-tch.component.html',
  styleUrls: ['./liste-demande-tch.component.css']
})
export class ListeDemandeTchComponent {
  reservations: Reservation[] = [];
}

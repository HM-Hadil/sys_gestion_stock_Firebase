import { Component } from '@angular/core';
import { Reservation } from '../../models/Reservation';
import { AuthService } from '../../services/authService/auth.service';
import { User } from '../../models/userModel/UserProfile';
import { MaterielService } from '../../services/materielService/materiel.service';
import { CommandeService } from 'src/app/services/commandeService/commande.service';

@Component({
  selector: 'app-liste-demande-tch',
  templateUrl: './liste-demande-tch.component.html',
  styleUrls: ['./liste-demande-tch.component.css'],
})
export class ListeDemandeTchComponent {
  reservations: Reservation[] = [];
  user?: User;
  nom: string | undefined;
  prenom: string | undefined;
  nomMat: string | undefined;
  mat: string | undefined;

  constructor(
    private auth: AuthService,
    private reserve: CommandeService,
    private matservice: MaterielService
  ) {}

  ngOnInit(): void {
    const uid = localStorage.getItem('uid'); // Get user ID from localStorage

    if (uid) {
      this.auth.getUserByEmail(uid).subscribe((user) => {
        if (user && user.email && user.approved === true) {
          console.log('teacher email', user.email);
          this.user = user;
          this.loadReservations(user.email);
        } else {
          alert('User is not approved or email is not available');
        }
      });
    } else {
      console.error('No user ID found in localStorage');
    }
  }
  loadReservations(email: string): void {
    this.reserve.getReservationsByEmail(email).subscribe((reservations) => {
      this.reservations = reservations;

      reservations.forEach((reservation) => {
        console.log('reservation.materielId', reservation.materielId);
        // Fetch user data
        this.auth.getUserData(reservation.userId).subscribe((user) => {
          if (user) {
            reservation.nom = user.nom;
            reservation.prenom = user.prenom;
          } else {
            console.error(
              'User data not found for the given UID:',
              reservation.userId
            );
          }
        });

        // Fetch materiel data
        this.matservice
          .getMateriel(reservation.materielId)
          .subscribe((materiel) => {
            console.log('mat');
            if (materiel) {
              reservation.nomMat = materiel.nom;
              console.log('materiel.nom', materiel.nom);
            } else {
              console.error(
                'Materiel data not found for the given ID:',
                reservation.materielId
              );
            }
          });
      });

      console.log('demandes liste ', this.reservations);
    });
  }

  delete(id: any) {
    this.reserve.deleteReservation(id);
  }

  accept(reservationKey: string): void {
    this.reserve
      .acceptReservation(reservationKey)
      .then(() => {
        console.log('Reservation status updated to accepted successfully');
      })
      .catch((error) => {
        console.error('Error updating reservation status:', error);
      });
  }
}

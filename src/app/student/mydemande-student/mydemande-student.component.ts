import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authService/auth.service';
import { MaterielService } from '../../services/materielService/materiel.service';
import { Reservation } from '../../models/Reservation';
import { CommandeService } from 'src/app/services/commandeService/commande.service';

@Component({
  selector: 'app-mydemande-student',
  templateUrl: './mydemande-student.component.html',
  styleUrls: ['./mydemande-student.component.css'],
})
export class MydemandeStudentComponent {
  userId: string | null = null;
  reservations: Reservation[] = [];
  error: any;
  isLoading = false; // Flag for loading state

  constructor(
    private authService: AuthService,
    private materielService: MaterielService,
    private reserve: CommandeService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getReservations();
  }
  getReservations() {
    this.userId = localStorage.getItem('uid');
    console.log('id user', this.userId);

    if (this.userId) {
      this.reserve.getReservationsByUserId(this.userId).then((reservations) => {
        this.reservations = reservations;
        // Removed filtering for "sent" status

        reservations.forEach((reservation) => {
          this.materielService
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
          console.log('mes demandes', reservations);
        });
        this.isLoading = false;
      });
    }
  }
  deleteReservation(reservation: Reservation) {
    if (confirm('Are you sure you want to delete this reservation?')) {
      this.reserve
        .deleteReservation(reservation.key) // Use key for deletion
        .then(() => {
          this.reservations = this.reservations.filter(
            (r) => r.key !== reservation.key
          ); // Remove deleted reservation from UI
          console.log('Reservation deleted successfully.');
          // Consider navigating to a success page or displaying a confirmation message
        })
        .catch((error) => {
          this.error =
            error.message ||
            'An error occurred while deleting the reservation.';
          console.error('Error deleting reservation:', error);
        });
    }
  }
}

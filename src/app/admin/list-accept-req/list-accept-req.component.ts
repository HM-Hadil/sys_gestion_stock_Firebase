import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Reservation } from 'src/app/models/Reservation';
import { AuthService } from 'src/app/services/authService/auth.service';
import { CommandeService } from 'src/app/services/commandeService/commande.service';
import { MaterielService } from 'src/app/services/materielService/materiel.service';

@Component({
  selector: 'app-list-accept-req',
  templateUrl: './list-accept-req.component.html',
  styleUrls: ['./list-accept-req.component.css']
})
export class ListAcceptReqComponent {
  reservations: Reservation[] = [];
  isLoading = false; // Flag for loading state

  constructor(
    private db: AngularFireDatabase,
    private matservice: MaterielService,
    private reservationService: CommandeService,
    private auth: AuthService
  ) {}
  ngOnInit(): void {
    this.reservationService.getAllReservations().subscribe(reservations => {
      this.reservations = reservations.filter(reservation =>
        (reservation.status === 'accepted')
      );
      this.reservations.forEach(reservation => {
        if (reservation.userId) {
          this.auth.getUserData(reservation.userId).subscribe(user => {
            if (user) {
              reservation.nom = user.nom;
              reservation.prenom = user.prenom;
              reservation.role = user.role;
            } else {
              console.error('User data not found for the given UID:', reservation.userId);
            }
          }, error => {
            console.error('Error fetching user data:', error);
          });
        } else {
          console.error('Reservation missing userId:', reservation);
        }

        if (reservation.materielId) {
          this.matservice.getMateriel(reservation.materielId).subscribe(materiel => {
            if (materiel) {
              reservation.nomMat = materiel.nom;
              reservation.qtStock = materiel.quantiteStock;
            } else {
              console.error('Materiel data not found for the given ID:', reservation.materielId);
            }
          }, error => {
            console.error('Error fetching materiel data:', error);
          });
        } else {
          console.error('Reservation missing materielId:', reservation);
        }
      });
      this.isLoading = false;
      // Flag for loading state

    }, error => {
      console.error('Error fetching reservations:', error);
    });
  }

}

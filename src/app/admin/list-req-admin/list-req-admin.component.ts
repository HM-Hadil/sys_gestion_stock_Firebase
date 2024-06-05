import { MaterielService } from './../../services/materielService/materiel.service';
import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable, combineLatest, flatMap, forkJoin, map } from 'rxjs';
import { Reservation } from 'src/app/models/Reservation';
import { AuthService } from 'src/app/services/authService/auth.service';
import { CommandeService } from 'src/app/services/commandeService/commande.service';

@Component({
  selector: 'app-list-req-admin',
  templateUrl: './list-req-admin.component.html',
  styleUrls: ['./list-req-admin.component.css']
})
export class ListReqAdminComponent {
  reservations: Reservation[] = [];
  reservationsRef!: AngularFireList<Reservation>;

  constructor(private db: AngularFireDatabase,private matservice:MaterielService,private reservationService: CommandeService,private auth:AuthService) { }
  ngOnInit(): void {
    this.reservationService.getAllReservations().subscribe(reservations => {
      this.reservations = reservations.filter(reservation => reservation.status === 'signed' || !reservation.email);
      reservations.forEach((reservation) => {
        console.log('reservation.materielId', reservation.materielId);
        // Fetch user data
        this.auth.getUserData(reservation.userId).subscribe((user) => {
          if (user) {
            reservation.nom = user.nom;
            reservation.prenom = user.prenom;
            reservation.role=user.role;
            console.log('nom preno',  reservation.nom,reservation.prenom);

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

            if (materiel) {
              reservation.nomMat = materiel.nom;
              reservation.qtStock=materiel.quantiteStock
              console.log('materiel.nom', materiel.nom);
            } else {
              console.error(
                'Materiel data not found for the given ID:',
                reservation.materielId
              );
            }
          });
      });

      console.log("reservat",this.reservations);
    });
  }

  acceptReservation(reservation: Reservation) {
    // Check if the reservation status is already 'accepted'
    if (reservation.status !== 'accepted') {
      // Update the reservation status to 'accepted'
      reservation.status = 'accepted';

      // Decrease the stock by the quantity of the reservation
      this.matservice.getMateriel(reservation.materielId).subscribe((materiel) => {
        if (materiel) {
          // Ensure quantiteStock is defined
          if (materiel.quantiteStock !== undefined) {
            // Calculate the new stock after reservation
            const newStock = materiel.quantiteStock - reservation.quantity;

            // Check if the new stock is greater than or equal to 0
            if (newStock >= 0) {
              // Update the stock
              materiel.quantiteStock = newStock;

              // Update the materiel in the database
              this.matservice.updateMaterielStock(reservation.materielId, newStock).subscribe(() => {
                console.log('Stock updated successfully.');
                // Update the reservation status in the database

              }, (error) => {
                console.error('Error updating stock:', error);
              });
            } else {
              console.error('Insufficient stock.');
              alert("Insufficient stock.");
            }
          } else {
            console.error('QuantiteStock is undefined for materiel.');
          }
        } else {
          console.error('Materiel not found.');
        }
      });
    }
  }


}

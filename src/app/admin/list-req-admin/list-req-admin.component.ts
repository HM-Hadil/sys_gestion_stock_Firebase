import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Reservation } from 'src/app/models/Reservation';
import { AuthService } from 'src/app/services/authService/auth.service';
import { CommandeService } from 'src/app/services/commandeService/commande.service';
import { MaterielService } from './../../services/materielService/materiel.service';
import { switchMap, catchError, take } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { Materiel } from 'src/app/models/materielModel/materiel';

@Component({
  selector: 'app-list-req-admin',
  templateUrl: './list-req-admin.component.html',
  styleUrls: ['./list-req-admin.component.css']
})
export class ListReqAdminComponent implements OnInit {
  reservations: Reservation[] = [];

  constructor(
    private db: AngularFireDatabase,
    private matservice: MaterielService,
    private reservationService: CommandeService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.reservationService.getAllReservations().subscribe(reservations => {
      this.reservations = reservations.filter(reservation =>
        (reservation.status == 'accepted')
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
    }, error => {
      console.error('Error fetching reservations:', error);
    });
  }

  acceptReservation(reservation: Reservation): void {
    if (reservation.status !== 'accepted') {
      if (!reservation.userId) {
        console.error('Reservation missing userId:', reservation);
        return;
      }

      if (!reservation.materielId) {
        console.error('Reservation missing materielId:', reservation);
        return;
      }

      const newStock = reservation.qtStock!- reservation.quantity; // Calculate the new stock

      this.matservice.getMateriel(reservation.materielId).pipe(
        switchMap((materiel: Materiel | null) => {
          if (materiel) {
            // return an observable when materiel is not null
            return this.updateStockAndReservation(reservation.materielId, newStock, reservation);

          } else {
            // return an empty observable when materiel is null
            return of(null);
          }
        }),
        catchError(error => {
          console.error('Error processing reservation:', error);
          return of(null);
        })
      ).subscribe(success => {
        if (success) {
          console.log('Reservation accepted and stock updated.');
        } else {
          console.error('Failed to accept reservation or update stock.');
        }
      });
    }
  }

  updateStockAndReservation(materialId: string, newStock: number, reservation: Reservation) {
    return this.db.object(`materials/${materialId}`).valueChanges().pipe(
      take(1), // Take only the first value emitted by the observable
      switchMap((material: any) => {
        if (newStock < 0) {
          console.error("Insufficient stock.");
          return of(null); // Return an observable with a null value
        }

        // Update the stock in the database
        return from(this.db.object(`materiel/${materialId}`).update({ quantiteStock: newStock })).pipe(
          switchMap(() => {
            // Update reservation status to 'accepted'
            reservation.status = 'accepted';
            return this.reservationService.updateReservationStatus(reservation);
          })
        );
      })
    );
  }

  refuseReservation(reservation: Reservation): void {
    reservation.status = 'rejected';
    this.reservationService.refuseReservation(reservation).subscribe(() => {
      console.log('Reservation refused.');
      alert("Reservation refused.")
      // Update the reservations list
      this.reservations = this.reservations.filter(r =>
        (!r.email && r.status !== 'accepted' && r.status !== 'rejected') || r.status === 'signed'
      );
    }, error => {
      console.error('Failed to refuse reservation:', error);
    });
  }
}

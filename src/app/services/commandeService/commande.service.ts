import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { Observable, flatMap, forkJoin, map } from 'rxjs';
import { Reservation } from 'src/app/models/Reservation';
import { Materiel } from 'src/app/models/materielModel/materiel';

@Injectable({
  providedIn: 'root',
})
export class CommandeService {
  private dbPath = '/reservations';
  reservationsRef!: AngularFireList<Reservation>;
  private materielNode = 'materiel';


  constructor(private db: AngularFireDatabase) {
    this.reservationsRef = this.db.list<Reservation>('reservations');
  }

  async submitReservation(
    userId: string,
    materielId: string,
    quantity: number,
    currentDate: string,
    email: string
  ): Promise<void> {
    const reservationData: Reservation = {
      userId,
      materielId,
      quantity,
      date: currentDate,
      email,
      status: 'sent', // Add default status
    };

    const reservationRef = this.db.list(this.dbPath).push(reservationData);

    return new Promise<void>((resolve, reject) => {
      reservationRef
        .then(() => {
          resolve(); // Resolve when the operation is complete
        })
        .catch((error) => {
          reject(error); // Reject if there's an error
        });
    });
  }
  deleteReservation(id: string): Promise<void> {
    return this.db.object(`${this.dbPath}/${id}`).remove();
  }

  //get the liste of reservation by email of teacher
  getReservationsByEmail(email: string): Observable<Reservation[]> {
    return this.db
      .list<Reservation>(this.dbPath, (ref) =>
        ref.orderByChild('email').equalTo(email)
      )
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            key: c.payload.key,
            ...(c.payload.val() as Reservation),
          }))
        ),
        map((reservations) =>
          reservations.filter((reservation) => reservation.status === 'sent')
        )
      );
  }
  // Get Reservation List
  getReservationList(): AngularFireList<Reservation> {
    return this.reservationsRef;
  }
  // Update Reservation Status to "accepted"
  acceptReservation(reservationKey: string): Promise<void> {
    const reservationRef = this.db.object(`reservations/${reservationKey}`);
    return reservationRef.update({ status: 'signed' });
  }


  getReservationsByUserId(userId: string): Promise<Reservation[]> {
    return new Promise<Reservation[]>((resolve, reject) => {
      if (this.reservationsRef) {
        // Check if reservationsRef is defined
        this.reservationsRef
          .snapshotChanges()
          .pipe(
            // Use map to extract only the data (payload.val()) from the snapshot
            map((changes) =>
              changes.map(
                (c) =>
                  ({ key: c.payload.key, ...c.payload.val() } as Reservation)
              )
            )
          )
          .subscribe(
            (reservations) => {
              const userReservations = reservations.filter(
                (reservation) => reservation.userId === userId
              );
              resolve(userReservations);
            },
            (error) => {
              reject(error);
            }
          );
      } else {
        reject(new Error('reservationsRef is not yet defined'));
      }
    });
  }
  updateMateriel(materiel: Materiel): Observable<void> {
    const materielRef = this.db.object(`${this.materielNode}/${materiel.id}`);
    return new Observable<void>((observer) => {
      materielRef.update(materiel)
        .then(() => {
          observer.next(); // Emit success
          observer.complete(); // Complete the observable
        })
        .catch((error) => {
          observer.error(error); // Emit error
        });
    });
  }
  // Get all reservations
  getAllReservations(): Observable<Reservation[]> {
    this.reservationsRef = this.db.list('/reservations');
    return this.reservationsRef.valueChanges().pipe(
      map(reservations => reservations as Reservation[]) // Cast to Reservation[]
    );
  }

 
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandeService } from 'src/app/services/commandeService/commande.service';
import { EditReservation } from 'src/app/models/EditReservation'; // Assuming the path to EditReservation model
import { Reservation } from 'src/app/models/Reservation'; // Assuming the path to Reservation model
import { MaterielService } from 'src/app/services/materielService/materiel.service';
import { Materiel } from 'src/app/models/materielModel/materiel';

@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.css']
})
export class EditReservationComponent implements OnInit {
  reservation: EditReservation = new EditReservation();
  materials: Materiel[] = [];
  email: string | undefined;
  quantity: number | undefined;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commandService: CommandeService,private materielService:MaterielService
  ) { }

  ngOnInit(): void {
    this.loadMaterials();
    this.route.paramMap.subscribe((params) => {

      const key = params.get('id');
      console.log("id",key)
      if (key) {
        this.commandService.getReservationById(key)

          .then((reservation: EditReservation) => {
            this.reservation = { ...reservation };
            this.email = reservation.email; // Fetch email
            this.quantity = reservation.quantity; // Fetch quantity
            console.log("reservation by id", this.quantity);
          })
          .catch((error) => {
            console.error('Error fetching reservation:', error);
          });
      }
    });
  }

  loadMaterials(): void {
    this.materielService.getMaterielList().valueChanges().subscribe((materials: Materiel[]) => {
      this.materials = materials; // Assign fetched materials to the property
    });
  }

  submitForm(): void {
    this.commandService.updateReservation(this.reservation)
      .then(() => {
        console.log('Reservation updated successfully.');
        this.router.navigate(['/reservations']);
      })
      .catch((error) => {
        console.error('Error updating reservation:', error);
      });
  }
}

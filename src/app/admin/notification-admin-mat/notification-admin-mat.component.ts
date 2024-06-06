import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Materiel } from 'src/app/models/materielModel/materiel';
import { MaterielService } from 'src/app/services/materielService/materiel.service';

@Component({
  selector: 'app-notification-admin-mat',
  templateUrl: './notification-admin-mat.component.html',
  styleUrls: ['./notification-admin-mat.component.css']
})
export class NotificationAdminMatComponent {
  materiels: Materiel[] = [];
  constructor(
    private materielService: MaterielService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMateriels();
  }
  loadMateriels(): void {
    this.materielService
      .getMaterielList()
      .snapshotChanges()
      .subscribe((changes) => {
        this.materiels = changes.map((c) => {
          const data = c.payload.val() as Materiel;
          const id = c.payload.key;
          console.log(`Materiel ID: ${id}`, data); // Log each materiel with its ID
          return { id, ...data };
        });

        console.log('All Materiels:', this.materiels); // Log all materiels before filtering

        this.materiels = this.materiels.filter((materiel: Materiel) => {
          return materiel.quantiteStock !== undefined && materiel.quantiteStock <= 5;
        }); // Filter materiels with quantity less than or equal to 5

        console.log('Filtered Materiels:', this.materiels); // Log filtered materiels
        this.materielService.notificationCount = this.materiels.length;
        console.log("notificationCount service",this.materielService.notificationCount)
      });
  }
  updateQuantity(id: any){
    this.router.navigate(['/materiel-detail', id]);

  }

}

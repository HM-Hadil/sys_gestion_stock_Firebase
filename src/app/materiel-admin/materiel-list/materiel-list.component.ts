import { Component, OnInit } from '@angular/core';
import { MaterielService } from '../../services/materielService/materiel.service';
import { Materiel } from '../../models/materielModel/materiel';
import { FormGroup } from '@angular/forms';
import {
  AngularFireAction,
  DatabaseSnapshot,
} from '@angular/fire/compat/database';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-materiel-list',
  templateUrl: './materiel-list.component.html',
  styleUrls: ['./materiel-list.component.css'],
})
export class MaterielListComponent implements OnInit {
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
          console.log(`Materiel ID: ${id}`, data); // Add this line to log each materiel with its ID
          return { id, ...data };
        });
      });
  }

  deleteMateriel(id: string | undefined): void {
    if (id) {
      this.materielService
        .deleteMateriel(id)
        .then(() => {
          console.log('Materiel deleted successfully');
          this.loadMateriels(); // Refresh the list after deletion
        })
        .catch((error) => {
          console.error('Error deleting materiel:', error);
        });
    } else {
      console.error('Materiel ID is undefined');
    }
  }
  editMateriel(id: any | undefined): void {
    if (id) {
      console.log('Navigating to edit materiel with ID:', id);
      this.router.navigate(['/materiel-detail', id]);
    } else {
      console.error('Materiel ID is undefined');
    }
  }
}

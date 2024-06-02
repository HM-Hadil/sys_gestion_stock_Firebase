
import { Component, OnInit } from '@angular/core';
import { MaterielService } from '../materiel.service';
import { Materiel } from '../materiel';

@Component({
  selector: 'app-materiel-list',
  templateUrl: './materiel-list.component.html',
  styleUrls: ['./materiel-list.component.css']
})
export class MaterielListComponent implements OnInit {
  materiels: Materiel[] = [];  // Initialisation du tableau

  constructor(private materielService: MaterielService) {}

  ngOnInit(): void {
    this.materielService.getMateriels().subscribe(data => {
      this.materiels = data;
    });
  }

  deleteMateriel(id?: string): void {  // Rendre l'ID optionnel
    if (id) {
      this.materielService.deleteMateriel(id).then(() => {
        console.log('Matériel supprimé avec succès');
      }).catch(error => {
        console.error('Erreur lors de la suppression du matériel : ', error);
      });
    } else {
      console.error('Erreur : ID du matériel non défini');
    }
  }
}

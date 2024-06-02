import { Component, OnInit , Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Materiel } from '../materiel';
import { MaterielService } from '../materiel.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-materiel-detail',
  templateUrl: './materiel-detail.component.html',
  styleUrls: ['./materiel-detail.component.css']
})
export class MaterielDetailComponent implements OnInit {
  @Input() materiel!: Materiel;
  isAdmin: boolean = false;
  materiels: Materiel[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private materielService: MaterielService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
   /**  const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.materielService.getMateriels().subscribe(data => {
        this.materiels = data;
      });
    }
    this.authService.user$.subscribe((user: { role: string; }) => {
      if (user) {
        // Vérifiez si l'utilisateur est un administrateur
        this.isAdmin = user.role === 'admin';
      }
    });*/
  }

  updateMateriel(): void {
    if (this.isAdmin && this.materiel.id) {
      this.materielService.updateMateriel(this.materiel.id, {
        nom: this.materiel.nom,
        description: this.materiel.description,
        quantite: this.materiel.quantite,
        seuil: this.materiel.seuil
      }).then(() => {
        alert('Matériel mis à jour avec succès!');
      }).catch(error => {
        console.error('Erreur lors de la mise à jour du matériel: ', error);
      });
    }
  }
}



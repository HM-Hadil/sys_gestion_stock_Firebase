import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Materiel } from '../../models/materielModel/materiel';
import { MaterielService } from '../../services/materielService/materiel.service';
import { AuthService } from '../../services/authService/auth.service';

@Component({
  selector: 'app-materiel-detail',
  templateUrl: './materiel-detail.component.html',
  styleUrls: ['./materiel-detail.component.css'],
})
export class MaterielDetailComponent implements OnInit {
  materielId: string | null = null;
  materiel: Materiel = new Materiel();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private materielService: MaterielService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.materielId = params.get('id');
      this.loadMateriel();
    });
  }

  loadMateriel(): void {
    if (this.materielId) {
      this.materielService
        .getMateriel(this.materielId)
        .subscribe((materiel) => {
          if (materiel) {
            this.materiel = materiel;
          } else {
            console.error('Materiel not found');
          }
        });
    } else {
      console.error('Invalid Materiel ID');
    }
  }

  updateMateriel(): void {
    if (this.materielId && this.materiel) {
      this.materielService
        .updateMateriel(this.materielId, this.materiel)
        .then(() => {
          this.router.navigate(['/listMateriel']); // Navigate back to the list or any other page
        })
        .catch((error) => {
          console.error('Error updating materiel:', error);
        });
    }
  }
}

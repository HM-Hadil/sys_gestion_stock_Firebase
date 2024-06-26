import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/authService/auth.service';
import { MaterielService } from '../services/materielService/materiel.service';
import { Materiel } from '../models/materielModel/materiel';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  isAdmin: boolean = false;
  totalMateriels: number = 0;
  lowStockMateriels: Materiel[] = [];
  totalCommandes: number = 0;

  constructor(
    private materielService: MaterielService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    /** this.authService.user$.subscribe((user: { role: string; }) => {
      if (user) {
        this.isAdmin = user.role === 'admin';
        if (this.isAdmin) {
          this.loadStatistics();
        }
      }
    });
  }*/
  }
  /**
  loadStatistics(): void {
    this.materielService.getMateriels().subscribe(materiels => {
      this.totalMateriels = materiels.length;
      this.lowStockMateriels = materiels.filter(m =>Materiel.quantite <= Materiel.seuil);
    });

    this.commandeService.getCommandes().subscribe(commandes => {
      this.totalCommandes = commandes.length;
    });
  }*/
}

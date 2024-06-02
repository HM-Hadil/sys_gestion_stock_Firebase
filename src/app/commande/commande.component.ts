import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../commande.service';
import { Commande } from '../commande';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {
  commandes: Commande[] = [];  // Initialisation du tableau

  constructor(private commandeService: CommandeService) {}

  ngOnInit(): void {
    this.commandeService.getCommandes().subscribe(data => {
      this.commandes = data;
    });
  }

  deleteCommande(id?: string): void {  // Rendre l'ID optionnel
    if (id) {
      this.commandeService.deleteCommande(id).then(() => {
        console.log('Commande supprimée avec succès');
      }).catch(error => {
        console.error('Erreur lors de la suppression de la commande : ', error);
      });
    } else {
      console.error('Erreur : ID de la commande non défini');
    }
  }
}


import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Etudiant } from './Etudiant';
import { Enseignant } from './enseignant';
import { Materiel } from './materiel';
import { Commande } from './commande';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private db: AngularFireDatabase) {}

  // CRUD pour Etudiant
  getEtudiants() {
    return this.db.list<Etudiant>('etudiants').valueChanges();
  }

  createEtudiant(etudiant: Etudiant) {
    const id = this.db.createPushId();
    return this.db.object(`etudiants/${id}`).set({...etudiant, id});
  }

  updateEtudiant(id: string, etudiant: Etudiant) {
    return this.db.object(`etudiants/${id}`).update(etudiant);
  }

  deleteEtudiant(id: string) {
    return this.db.object(`etudiants/${id}`).remove();
  }

  // CRUD pour Enseignant
  getEnseignants() {
    return this.db.list<Enseignant>('enseignants').valueChanges();
  }

  createEnseignant(enseignant: Enseignant) {
    const id = this.db.createPushId();
    return this.db.object(`enseignants/${id}`).set({...enseignant, id});
  }

  updateEnseignant(id: string, enseignant: Enseignant) {
    return this.db.object(`enseignants/${id}`).update(enseignant);
  }

  deleteEnseignant(id: string) {
    return this.db.object(`enseignants/${id}`).remove();
  }

  // CRUD pour Materiel
  getMateriel() {
    return this.db.list<Materiel>('materiels').valueChanges();
  }

  createMateriel(materiel: Materiel) {
    const id = this.db.createPushId();
    return this.db.object(`materiels/${id}`).set({...materiel, id});
  }

  updateMateriel(id: string, materiel: Materiel) {
    return this.db.object(`materiels/${id}`).update(materiel);
  }

  deleteMateriel(id: string) {
    return this.db.object(`materiels/${id}`).remove();
  }

  // CRUD pour Commande
  getCommandes() {
    return this.db.list<Commande>('commandes').valueChanges();
  }

  createCommande(commande: Commande) {
    const id = this.db.createPushId();
    return this.db.object(`commandes/${id}`).set({...commande, id});
  }

  updateCommande(id: string, commande: Commande) {
    return this.db.object(`commandes/${id}`).update(commande);
  }

  deleteCommande(id: string) {
    return this.db.object(`commandes/${id}`).remove();
  }
}

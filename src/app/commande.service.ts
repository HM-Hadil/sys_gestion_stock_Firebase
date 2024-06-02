import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { Commande } from './commande';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private collectionPath = '/commandes';

  constructor(private db: AngularFireDatabase) {}

  getCommandes(): Observable<Commande[]> {
    return this.db.list<Commande>(this.collectionPath).valueChanges();
  }

  getCommande(id: string): Observable<Commande | null> {
    return this.db.object<Commande>(`${this.collectionPath}/${id}`).valueChanges();
  }

  createCommande(commande: Commande): Promise<void> {
    const id = this.db.createPushId();
    commande.id = id;
    return this.db.object(`${this.collectionPath}/${id}`).set(commande);
  }

  updateCommande(id: string, commande: Commande): Promise<void> {
    return this.db.object(`${this.collectionPath}/${id}`).update(commande);
  }

  deleteCommande(id: string): Promise<void> {
    return this.db.object(`${this.collectionPath}/${id}`).remove();
  }
}

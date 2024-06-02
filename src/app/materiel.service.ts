import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { Materiel } from './materiel';

@Injectable({
  providedIn: 'root'
})
export class MaterielService {
  private collectionPath = '/materiels';

  constructor(private db: AngularFireDatabase) {}

  getMateriels(): Observable<Materiel[]> {
    return this.db.list<Materiel>(this.collectionPath).valueChanges();
  }

  getMateriel(id: string): Observable<Materiel |null> {
    return this.db.object<Materiel>(`${this.collectionPath}/${id}`).valueChanges();
  }

  createMateriel(materiel: Materiel): Promise<void> {
    const id = this.db.createPushId();
    materiel.id = id;
    return this.db.object(`${this.collectionPath}/${id}`).set(materiel);
  }

  updateMateriel(id: string, materiel: Materiel): Promise<void> {
    return this.db.object(`${this.collectionPath}/${id}`).update(materiel);
  }

  deleteMateriel(id: string): Promise<void> {
    return this.db.object(`${this.collectionPath}/${id}`).remove();
  }
}

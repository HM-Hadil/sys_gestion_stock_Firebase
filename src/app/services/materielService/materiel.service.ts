import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { Materiel } from 'src/app/models/materielModel/materiel';

@Injectable({
  providedIn: 'root',
})
export class MaterielService {
  private dbPath = '/materiel';
  materielsRef: AngularFireList<Materiel>;
  constructor(private db: AngularFireDatabase) {
    this.materielsRef = db.list(this.dbPath);
  }
  // Create Materiel
  createMateriel(materiel: Materiel): any {
    return this.materielsRef.push(materiel);
  }

  // Delete Materiel
  deleteMateriel(id: string): Promise<void> {
    return this.materielsRef.remove(id);
  }

  // Get Materiel List
  getMaterielList(): AngularFireList<Materiel> {
    return this.materielsRef;
  }

  getMateriel(id: string): Observable<Materiel | null> {
    return this.db.object<Materiel>(`${this.dbPath}/${id}`).valueChanges();
  }

  updateMateriel(id: string, materiel: Materiel): Promise<void> {
    return this.db.object(`${this.dbPath}/${id}`).update(materiel);
  }
  // Update the stock of a material
  updateMaterielStock(materielId: string, newStock: number): Observable<void> {
    return new Observable<void>((observer) => {
      this.db.object(`materiel/${materielId}`).update({ quantiteStock: newStock })
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}

import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AuthService } from './services/authService/auth.service';
import { MaterielService } from './services/materielService/materiel.service';
import { Materiel } from './models/materielModel/materiel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'final1';
  materiels: Materiel[] = [];
  notificationCount: number = 0;

  constructor(private materielService: MaterielService,

) {
    var firebaseConfig = {
      apiKey: 'AIzaSyCnhvrOgCuM93lblkm0EF_s6PCMoHJsIXE',
      authDomain: 'projetweb-63204.firebaseapp.com',
      projectId: 'projetweb-63204',
      storageBucket: 'projetweb-63204.appspot.com',
      messagingSenderId: '675223239125',
      appId: '1:675223239125:web:1569ab0e93290a2013a55c',
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
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
          console.log(`Materiel ID: ${id}`, data); // Log each materiel with its ID
          return { id, ...data };
        });

        console.log('All Materiels:', this.materiels); // Log all materiels before filtering

        this.materiels = this.materiels.filter((materiel: Materiel) => {
          return materiel.quantiteStock !== undefined && materiel.quantiteStock <= 5;
        }); // Filter materiels with quantity less than or equal to 5

        console.log('Filtered Materiels:', this.materiels); // Log filtered materiels
        this.notificationCount = this.materiels.length;
        console.log("notificationCount app",this.notificationCount )
      });
  }

}

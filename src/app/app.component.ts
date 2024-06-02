import { Component } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'final1';
  constructor(private authservice: AuthService) {
    var firebaseConfig = {
      apiKey: "AIzaSyCnhvrOgCuM93lblkm0EF_s6PCMoHJsIXE",
      authDomain: "projetweb-63204.firebaseapp.com",
      projectId: "projetweb-63204",
      storageBucket: "projetweb-63204.appspot.com",
      messagingSenderId: "675223239125",
      appId: "1:675223239125:web:1569ab0e93290a2013a55c"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}


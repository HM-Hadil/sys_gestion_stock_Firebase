import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userProfileRef;

  afAuth: any;

  constructor(
    private fireAuth: AngularFireAuth,
    private db: AngularFireDatabase,private router:Router
  ) {
    this.userProfileRef = this.db.list('users');
  }

  signupUser(nom: string, prenom: string, role: any, phone: number, email: string, password: string) {
    return this.fireAuth.createUserWithEmailAndPassword(email, password).then(newUser => {
      if (newUser.user) {
        const userRef = this.db.object(`users/${newUser.user.uid}`);
        return userRef.set({
          nom: nom,
          prenom: prenom,
          role: role,
          phone: phone,
          email: email
          // Do not store the password in the database
        });
      } else {
        throw new Error('User creation failed');
      }
    }).catch(error => {
      console.error("Error signing up user:", error);
      throw error;
    });
  }

  // Reset password
  resetPassword(email: string) {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  // Login user
  login(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  // Logout user
  logout() {
    return firebase.auth().signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  // Sign in user
  signInUser(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  // Get current user
  getUser(): Observable<any> {
    return this.afAuth.authState;
  }
}

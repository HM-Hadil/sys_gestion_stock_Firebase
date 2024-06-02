import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { User } from './UserProfile'; // Assuming User interface is defined elsewhere
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) { }
  registerUser(nom: string, prenom: string, role: string, phone: number, email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        if (userCredential.user) {
          const userData: User = {
            uid: userCredential.user.uid,
            nom,
            prenom,
            role,
            phone,
            email,
            approved: false // Default value, admin can approve later
          };
          return this.firestore.collection('users').doc<User>(userCredential.user.uid).set(userData);
        } else {
          throw new Error('User creation failed');
        }
      })
      .catch(error => {
        console.error('Error signing up user:', error);
        throw error;
      });
  }

    // Existing registerUser method

    getUsers(): Observable<User[]> {
      return this.firestore.collection<User>('users').snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as User;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
    }

    deleteUser(id: string) {
      return this.firestore.collection('users').doc(id).delete();
    }

  updateUserApproval(uid: string) {
    return this.firestore.collection('users').doc(uid).update({ approved: true });
  }
}

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

  constructor(private router:Router,private afAuth: AngularFireAuth, private firestore: AngularFirestore) { }
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

  loginUser(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }


  
  getCurrentUser() {
    return this.afAuth.currentUser;
  }

  getUserData(uid: string): Observable<User | null> {
    return this.firestore.doc<User>(`users/${uid}`).valueChanges().pipe(
      map(user => user || null) 
    );
  }

  isAuthenticated() {
    return this.afAuth.authState;
  }

  isApprovedUser(uid: string) {
    return this.firestore.collection('users').doc(uid).valueChanges();
  }

 
  async loginAndCheckApproval(email: string, password: string) {
    try {
      // Sign in the user with email and password
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
      
      // Check if user is signed in
      if (userCredential?.user) {
        const uid = userCredential.user.uid;
        localStorage.setItem('uid', uid);
  
        // Query Firestore to check if the user is approved
        const userDoc = await this.firestore.collection('users').doc(uid).get().toPromise();
        
        // Check if userDoc exists and has data
        if (userDoc?.exists) {
          const userData = userDoc.data() as User; // Cast userData to User interface
          
          // Check if user data exists and if the user is approved
          if (userData && userData.approved === true) {
            // Navigate based on user role
            if (userData.role === 'etudiant') {
              this.router.navigate(['/studentProfile']);
            } else if (userData.role === 'enseignant') {
              this.router.navigate(['/teacher-profile']);
            } else {
              // Handle unexpected role
              console.error('Unexpected user role:', userData.role);
            }
          } else {
            // Alert the user that their account is not activated yet
            alert('Your account is not activated yet.');
            // Log out if the user is not approved
            await this.logoutUser();
          }
        } else {
          // Log out if user document does not exist
          await this.logoutUser();
          throw new Error('User document does not exist.');
        }
      }
    } catch (error) {
      console.error('Error logging in and checking approval:', error);
      throw error;
    }
  }
  async logoutUser() {
    try {
      await this.afAuth.signOut();
      localStorage.removeItem('uid');
      // Redirect to the login page or any other page
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  }

  getUserByEmail(uid: string): Observable<User | undefined> {
    return this.firestore.collection<User>('users').doc(uid).valueChanges();
  }
}

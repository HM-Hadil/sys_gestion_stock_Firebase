import firebase from 'firebase/compat/app';

export interface User extends firebase.firestore.DocumentData {
  uid: string;
  nom?: string;
  prenom?: string;
  phone?: number;
  role?: string;
  email?: string;
  approved?: boolean;
}
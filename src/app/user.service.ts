import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  addUser(user: User) {
    throw new Error('Method not implemented.');
  }

  userList: AngularFireList<any>



  constructor(private db: AngularFireDatabase) {

    this.userList = db.list('users')

  }



  getUsers(): Observable<any> {
    return this.db.list('users').snapshotChanges();
  }

  getUserById(id: any): Observable<any> {
    return this.db.list('users', ref => ref.orderByKey().equalTo(id)).snapshotChanges();
  }

}


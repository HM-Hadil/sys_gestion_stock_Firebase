import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseOperation } from '@angular/fire/compat/database/interfaces';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { User } from '../UserProfile';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users$!: Observable<User[]>;

  constructor(private authService: AuthService,public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.users$ = this.authService.getUsers();
  }
  openDialog(id: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Voulez-vous vraiment supprimer ces données?"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authService.deleteUser(id).then(() => {
          console.log('User successfully deleted!');
        }).catch(error => {
          console.error('Error removing user: ', error);
        });
      }
    });
  }
  


  approveAccount(uid: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Are you sure you want to accept this user?"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authService.updateUserApproval(uid).then(() => {
          console.log('User approval status updated successfully!');
        }).catch(error => {
          console.error('Error updating user approval status: ', error);
        });
      }
    });
  }
}

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  AngularFirestoreModule,
} from '@angular/fire/compat/firestore';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { UsersComponent } from './admin/users/users.component';
import { ResetpasswordComponent } from './auth/register/resetpassword/resetpassword.component';
import { FaculteComponent } from './home-page/faculte/faculte.component';
import { FinalComponent } from './home-page/final/final.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterielListComponent } from './materiel-admin/materiel-list/materiel-list.component';
import { MaterielDetailComponent } from './materiel-admin/materiel-detail/materiel-detail.component';
import { CommandeComponent } from './student/commande/commande.component';
import { AlertComponent } from './alert/alert.component';
import { AddMaterielComponent } from './materiel-admin/add-materiel/add-materiel.component';
import { TeacherProfileComponent } from './teacher/teacher-profile/teacher-profile.component';
import { StudentProfileComponent } from './student/student-profile/student-profile.component';
import { DemandeMtTeacherComponent } from './student/demande-mt-teacher/demande-mt-teacher.component';
import { ListeDemandeTchComponent } from './teacher/liste-demande-tch/liste-demande-tch.component';
import { MydemandeStudentComponent } from './student/mydemande-student/mydemande-student.component';
import { ReserverMatTechComponent } from './teacher/reserver-mat-tech/reserver-mat-tech.component';
import { ListReqAdminComponent } from './admin/list-req-admin/list-req-admin.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { EditReservationComponent } from './student/edit-reservation/edit-reservation.component';
import { ListAcceptReqComponent } from './admin/list-accept-req/list-accept-req.component';
import { NotificationAdminMatComponent } from './admin/notification-admin-mat/notification-admin-mat.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    ResetpasswordComponent,
    FaculteComponent,
    FinalComponent,
    DashboardComponent,
    MaterielListComponent,
    MaterielDetailComponent,
    CommandeComponent,
    AlertComponent,
    AddMaterielComponent,
    TeacherProfileComponent,
    StudentProfileComponent,
    DemandeMtTeacherComponent,
    ListeDemandeTchComponent,
    MydemandeStudentComponent,
    ReserverMatTechComponent,
    ListReqAdminComponent,
    ConfirmationDialogComponent,
    EditReservationComponent,
    ListAcceptReqComponent,
    NotificationAdminMatComponent,
  ],
  imports: [
    BrowserModule,
    MatSnackBarModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
    AngularFireModule,
    MatDialogModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

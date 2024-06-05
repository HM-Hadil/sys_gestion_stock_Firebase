import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { UsersComponent } from './admin/users/users.component';
import { ResetpasswordComponent } from './auth/register/resetpassword/resetpassword.component';
import { FaculteComponent } from './home-page/faculte/faculte.component';
import { FinalComponent } from './home-page/final/final.component';
import { CommandeComponent } from './student/commande/commande.component';
import { MaterielListComponent } from './materiel-admin/materiel-list/materiel-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterielDetailComponent } from './materiel-admin/materiel-detail/materiel-detail.component';
import { AddMaterielComponent } from './materiel-admin/add-materiel/add-materiel.component';
import { TeacherProfileComponent } from './teacher/teacher-profile/teacher-profile.component';
import { StudentProfileComponent } from './student/student-profile/student-profile.component';
import { DemandeMtTeacherComponent } from './student/demande-mt-teacher/demande-mt-teacher.component';
import { ListeDemandeTchComponent } from './teacher/liste-demande-tch/liste-demande-tch.component';
import { MydemandeStudentComponent } from './student/mydemande-student/mydemande-student.component';
import { ReserverMatTechComponent } from './teacher/reserver-mat-tech/reserver-mat-tech.component';
import { ListReqAdminComponent } from './admin/list-req-admin/list-req-admin.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'users', component: UsersComponent },
  { path: 'addMateriel', component: AddMaterielComponent },
  { path: 'listMateriel', component: MaterielListComponent },
  { path: 'materiel-detail/:id', component: MaterielDetailComponent },
  { path: 'teacher-profile', component: TeacherProfileComponent },
  { path: 'studentProfile', component: StudentProfileComponent },
  { path: 'demandeMatTeacher', component: DemandeMtTeacherComponent },
  { path: 'commandes/:id', component: CommandeComponent },
  { path: 'listDEmandeTch', component: ListeDemandeTchComponent },
  { path: 'MydemandeStudent', component: MydemandeStudentComponent },
  { path: 'reserverMatTech', component: ReserverMatTechComponent },
  { path: 'listDemandeAdmin', component: ListReqAdminComponent },



  { path: 'resetpassword', component: ResetpasswordComponent },
  { path: 'faculte', component: FaculteComponent },
  { path: 'final', component: FinalComponent },
  { path: 'materiels', component: MaterielListComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UsersComponent } from './users/users.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { FaculteComponent } from './faculte/faculte.component';
import { FinalComponent } from './final/final.component';
import { CommandeComponent } from './commande/commande.component';
import { MaterielListComponent } from './materiel-list/materiel-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterielDetailComponent } from './materiel-detail/materiel-detail.component';
import { AddMaterielComponent } from './add-materiel/add-materiel.component';
import { TeacherProfileComponent } from './teacher-profile/teacher-profile.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { DemandeMtTeacherComponent } from './demande-mt-teacher/demande-mt-teacher.component';
import { ListeDemandeTchComponent } from './liste-demande-tch/liste-demande-tch.component';


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




  { path: 'resetpassword', component: ResetpasswordComponent },
  { path: 'adduser', component: AddUserComponent },
  { path: 'update-user/:id', component: UpdateUserComponent },
  { path: 'confirmation-dialog', component: ConfirmationDialogComponent },
  { path: 'faculte', component: FaculteComponent },
  { path: 'final', component: FinalComponent },
  { path: 'materiels', component: MaterielListComponent },
  { path: 'dashboard', component: DashboardComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }

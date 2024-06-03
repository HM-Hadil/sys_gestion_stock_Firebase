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


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'users', component: UsersComponent },
  { path: 'addMateriel', component: AddMaterielComponent },
  { path: 'listMateriel', component: MaterielListComponent },
  { path: 'materiel-detail/:id', component: MaterielDetailComponent },

 

  { path: 'resetpassword', component: ResetpasswordComponent },
  { path: 'adduser', component: AddUserComponent },
  { path: 'update-user/:id', component: UpdateUserComponent },
  { path: 'confirmation-dialog', component: ConfirmationDialogComponent },
  { path: 'faculte', component: FaculteComponent },
  { path: 'final', component: FinalComponent },
  { path: 'materiels', component: MaterielListComponent },
  { path: 'commandes', component: CommandeComponent },
  { path: 'dashboard', component: DashboardComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }

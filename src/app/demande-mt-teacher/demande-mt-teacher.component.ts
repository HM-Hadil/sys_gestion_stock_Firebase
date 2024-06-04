import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Materiel } from '../materiel';
import { MaterielService } from '../materiel.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-demande-mt-teacher',
  templateUrl: './demande-mt-teacher.component.html',
  styleUrls: ['./demande-mt-teacher.component.css']
})
export class DemandeMtTeacherComponent {
  showReservationForm = false;
  materiels: { id: any, data: Materiel }[] = [];

  constructor(private formBuilder: FormBuilder,public dialog: MatDialog,private authService: AuthService,private materielService: MaterielService,private router:Router) { }

  ngOnInit(): void {
    
    this.loadMateriels();}
    loadMateriels(): void {
      this.materielService.getMaterielList().snapshotChanges().subscribe(changes => {
        this.materiels = changes.map(c => {
          const data = c.payload.val() as Materiel;
          const id = c.payload.key as string;
          console.log(`Materiel ID: ${id}`, data);  // Log each materiel with its ID
          return { id, data };
        });
      });
    }
 
  
reserver(id:any){
  this.router.navigate(['/commandes',id])
}
  
}

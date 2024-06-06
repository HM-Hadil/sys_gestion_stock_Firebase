import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, MinLengthValidator } from '@angular/forms';
import { Materiel } from '../../models/materielModel/materiel';
import { MaterielService } from '../../services/materielService/materiel.service';

@Component({
  selector: 'app-add-materiel',
  templateUrl: './add-materiel.component.html',
  styleUrls: ['./add-materiel.component.css'],
})
export class AddMaterielComponent {
  materiels: Materiel[] = [];
  materielForm: FormGroup;

  constructor(
    private materielService: MaterielService,
    private fb: FormBuilder
  ) {
    this.materielForm = this.fb.group({
      nom: ['', Validators.required],
      type: ['', Validators.required],
      description: [''],
      quantiteStock: ['', [Validators.required,Validators.min(1)]],
    });
  }
 // Custom validator function to ensure quantity is greater than 0


  addMateriel(): void {
    if (this.materielForm.valid) {
      const newMateriel: Materiel = this.materielForm.value;
      this.materielService
        .createMateriel(newMateriel)
        .then(() => {
          console.log('New materiel added successfully!');
          this.materielForm.reset(); // Reset the form
        })
        .catch((error: any) => console.error('Error adding materiel:', error));
    }
  }
}

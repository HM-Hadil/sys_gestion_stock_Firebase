import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Materiel } from '../../models/materielModel/materiel';
import { MaterielService } from '../../services/materielService/materiel.service';
import { AuthService } from '../../services/authService/auth.service';
import { CommandeService } from 'src/app/services/commandeService/commande.service';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css'],
})
export class CommandeComponent implements OnInit {
  materielId: any;
  qtstk: any;

  reservationForm!: FormGroup;
  constructor(
    private authService: AuthService,
    private materielService: MaterielService,
    private reservationService: CommandeService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.materielId = params.get('id');
    });
    this.initForm();
    this.loadMateriel();
  }
  initForm(): void {
    this.reservationForm = this.formBuilder.group({
      quantity: ['', [Validators.required, Validators.min(1)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }
  loadMateriel(): void {
    this.materielService.getMateriel(this.materielId).subscribe((materiel) => {
      if (materiel) {
        this.qtstk = materiel.quantiteStock;
        console.log('materiel ', this.qtstk);
      } else {
        // Handle case when materiel is not found
        console.error('Materiel not found');
      }
    });
  }
  async submitReservation(): Promise<void> {
    if (this.reservationForm.valid) {
      const userId = localStorage.getItem('uid'); // Get user ID from localStorage
      if (!userId) {
        console.error('User ID is missing');
        return;
      }

      const quantity = this.reservationForm.value.quantity;
      const email = this.reservationForm.value.email;
      const currentDate = new Date().toISOString();

      this.authService.getUsers().subscribe((users) => {
        const user = users.find(
          (u) =>
            u.email === email && u.approved == true && u.role === 'enseignant'
        );
        if (user) {
          if (quantity <= this.qtstk) {
            // Call service method to submit reservation
            this.reservationService
              .submitReservation(
                userId,
                this.materielId,
                quantity,
                currentDate,
                email
              )
              .then(() => {
                console.log('Reserved successfully');
                alert('Reserved successfully');
                // Reset form and hide it
                this.reservationForm.reset();
              })
              .catch((error: any) => {
                // Handle error (e.g., display error message)
                console.error('Error submitting reservation:', error);
              });
          } else {
            alert('Quantity desired exceeds available stock.');
          }
        } else {
          alert('The email does not exist or the user is not approved.');
        }
      });
    }
  }
}

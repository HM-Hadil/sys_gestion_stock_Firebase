import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  isEnseignant = false;
  isSubmitting = false; // Flag to prevent multiple submissions

  reservationForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private materielService: MaterielService,
    private reservationService: CommandeService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
private router:Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.materielId = params.get('id');
    });
    this.initForm();
    this.loadMateriel();
    this.checkUserRole();
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
    if (this.reservationForm.valid && !this.isSubmitting) {
      this.isSubmitting = true; // Set flag to prevent multiple submissions
      try {
        const userId = localStorage.getItem('uid');
        if (!userId) {
          console.error('User ID is missing');
          return;
        }

        const quantity = this.reservationForm.value.quantity;
        const email = this.reservationForm.value.email;
        const currentDate = new Date().toISOString();

        // Check stock availability before user validation
        if (quantity > this.qtstk) {
          alert('Requested quantity exceeds available stock.');
          this.isSubmitting = false; // Reset flag even if quantity check fails
          return;
        }

        // Fetch user data to check role
        this.authService.getUserData(userId).subscribe((user) => {
          if (user && user.role === 'enseignant') {
            // Submit reservation with email as null
            this.reservationService
              .submitReservation(userId, this.materielId, quantity, currentDate, "")
              .then(() => {
                console.log('Reserved successfully');
                alert('Reserved successfully');
                this.reservationForm.reset(); // Reset form
              })
              .catch((error) => {
                console.error('Error submitting reservation:', error);
              });
          } else {
            this.authService.getUsers().subscribe((users) => {
              const user = users.find(
                (u) =>
                  u.email === email && u.approved === true && u.role === 'enseignant'
              );
              if (user) {
                // Call service method to submit reservation
                this.reservationService
                  .submitReservation(userId, this.materielId, quantity, currentDate, email)
                  .then(() => {
                    console.log('Reserved successfully');
                    alert('Reserved successfully');
                     window.location.reload();
                     this.router.navigate(['/MydemandeStudent']);

                    this.reservationForm.reset(); // Reset form
                  })
                  .catch((error) => {
                    console.error('Error submitting reservation:', error);
                  });
              } else {
                alert('The email does not exist, the user is not approved, or the user is not an enseignant.');
              }
              this.isSubmitting = false; // Reset flag after submission (success or error)
            });
          }
        });
      } catch (error: any) {
        console.error('Error submitting reservation:', error);
        // Handle error (e.g., display error message)
        this.isSubmitting = false; // Reset flag after submission (error)
      }
    }
  }

  private checkUserRole() {
    const userId = localStorage.getItem('uid');
    if (userId) {
      this.authService.getUserData(userId).subscribe((user) => {
        if (user && user.role === 'enseignant') {
          this.isEnseignant = true;
          this.reservationForm.get('email')?.clearValidators(); // Remove validators if user is enseignant
          this.reservationForm.get('email')?.updateValueAndValidity(); // Update form validity
        }
      });
    }
  }
}

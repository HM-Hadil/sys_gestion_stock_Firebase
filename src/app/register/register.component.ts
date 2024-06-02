import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  myForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.myForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],  // Assuming a 10-digit phone number
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  saveUser() {
    if (this.myForm.valid) {
      const { nom, prenom, email, role, phone, password } = this.myForm.value;
      this.authService.signupUser(nom, prenom, role, phone, email, password).then(() => {
        console.log('User signed up successfully!');
      }).catch(error => {
        console.error('Error signing up user:', error);
      });
    } else {
      console.error('Form is invalid');
    }
  }

}

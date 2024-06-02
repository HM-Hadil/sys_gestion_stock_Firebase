import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  visible = false;
  password = '';

  toggleVisibility() {
    this.visible = !this.visible;
  }

  loginForm!: FormGroup
  errorMessage: any;




  constructor(private fb: FormBuilder, private authservice: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.loginForm = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    }
    )
  }
  getEmail() {
    return this.loginForm.get('email')
  }
  getPassword() {
    return this.loginForm.get('password')
  }

  login() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    this.authservice.signInUser(email, password).then(
      () => {
        this.router.navigate(['/users']);
        this.router.navigate(['/students']);
       
      },
      
  
      (error) => {
        this.errorMessage = error
      }
    )
  }




}


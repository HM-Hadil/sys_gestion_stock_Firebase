import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../UserProfile';
import { Router } from '@angular/router';
import { Materiel } from '../materiel';
import { MaterielService } from '../materiel.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent {
  nom: string | undefined;
  prenom: string | undefined;
 
  constructor(private authService: AuthService,private router:Router) { }
  ngOnInit(): void {
    // Retrieve UID from localStorage
    const uid = localStorage.getItem('uid');
    if (uid) {
      // Fetch user data based on UID
      this.authService.getUserData(uid).subscribe((user: User | null) => {
        if (user) {
          // Assign nom and prenom from user data
          this.nom = user.nom;
          this.prenom = user.prenom;
        } else {
          console.error('User data not found for the given UID');
        }
      });
    } else {
      console.error('UID not found in localStorage');
    }
  }

  logout(){
    this.authService.logoutUser();
  }

}

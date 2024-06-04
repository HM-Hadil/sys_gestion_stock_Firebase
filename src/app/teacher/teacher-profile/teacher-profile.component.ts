import { Component } from '@angular/core';
import { User } from '../../models/userModel/UserProfile';
import { AuthService } from '../../services/authService/auth.service';
import { auth } from 'firebase-admin';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css'],
})
export class TeacherProfileComponent {
  nom: string | undefined;
  prenom: string | undefined;
  constructor(private authService: AuthService) {}
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

  logout() {
    this.authService.logoutUser();
  }
}
